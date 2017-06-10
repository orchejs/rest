import * as express from 'express';
import * as cors from 'cors';
import * as http from 'http';

import { HttpRequestMethod } from '../constants/http-request-method';
import { Engine } from './engine';
import { CompatVersions } from '../interfaces/compat-versions';
import { OrcheConfig } from '../interfaces/orche-config';
import { ExpressSettings } from '../interfaces/express-settings';
import { RouterUnit } from '../interfaces/router-unit';
import { RouterConfig } from '../interfaces/router-config';
import { InterceptorConfig } from '../interfaces/interceptor-config';
import { InterceptorLoader } from '../loaders/interceptor.loader';
import { RouteLoader } from '../loaders/route.loader';
import { PathUtils } from '../utils/path.utils';


export class ExpressEngine extends Engine {

  protected compatVersions: CompatVersions = { dependency: 'express', from: '4.0.0', to: '4.2.0' };

  constructor(userConfig?: OrcheConfig) {
    super(userConfig);
  }

  public loadServer(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        this.app = express();
      } catch (error) {
        // TODO engine library not loaded.
        throw Error();
      }

      // Loading preprocessing interceptors
      let loadedPreProcessingInterceptors: InterceptorConfig[];
      try {
        loadedPreProcessingInterceptors = await this.loadPreProcessors(this.app);
      } catch (error) {
        reject();
      }

      // Loading app's Routes
      let loadedRoutes: RouterConfig[] = [];
      try {
        loadedRoutes = await this.loadRoutes(this.app, this.config.path);
      } catch (error) {
        reject();
      }

      // Loading postprocessing interceptors
      let loadedPostProcessingInterceptors: InterceptorConfig[];
      try {
        loadedPostProcessingInterceptors = await this.loadPostProcessors(this.app);
      } catch (error) {
        reject();
      }

      this.server = this.app.listen(this.config.port, () => {
        const initMsg = this.config.initMessage || 'Server is up on port ' + this.config.port;
        // TODO add an logging library to the project
        console.log(initMsg);
        // TODO return statistics and express app reference
        resolve(this.server);
      });
    });
  }

  protected loadRoutes(app: any, path: string): Promise<any> {
    const loadedRoutes: RouterConfig[] = [];

    return new Promise((resolve, reject) => {
      if (!RouteLoader.routerConfigs || RouteLoader.routerConfigs.length === 0) {
        reject('There is no express route to configure!');
        return;
      }

      for (let index = 0; index < RouteLoader.routerConfigs.length; index += 1) {
        let loaded: boolean = true;

        const routerConfig: RouterConfig = RouteLoader.routerConfigs[index];
        const routerConfigPath = PathUtils.urlSanitation(routerConfig.path);
        const router: express.Router = express.Router();
        const routerUnits: RouterUnit[] = routerConfig.routerUnits;

        routerUnits.forEach((routerUnit) => {
          const method: any = this.loadInterceptors(routerConfig.className, routerUnit.method,
            routerUnit.methodName);

          if (routerUnit.preflight) {
            router.options(routerUnit.path, cors(routerUnit.corsOptions));
          }

          switch (routerUnit.httpMethod) {
            case HttpRequestMethod.Get:
              if (routerUnit.corsOptions) {
                router.get(routerUnit.path, cors(routerUnit.corsOptions), method);
              } else {
                router.get(routerUnit.path, method);
              }
              break;
            case HttpRequestMethod.Post:
              if (routerUnit.corsOptions) {
                router.post(routerUnit.path, cors(routerUnit.corsOptions), method);
              } else {
                router.post(routerUnit.path, method);
              }
              break;
            case HttpRequestMethod.Put:
              if (routerUnit.corsOptions) {
                router.put(routerUnit.path, cors(routerUnit.corsOptions), method);
              } else {
                router.put(routerUnit.path, method);
              }
              break;
            case HttpRequestMethod.Head:
              if (routerUnit.corsOptions) {
                router.head(routerUnit.path, cors(routerUnit.corsOptions), method);
              } else {
                router.head(routerUnit.path, method);
              }
              break;
            case HttpRequestMethod.Delete:
              if (routerUnit.corsOptions) {
                router.delete(routerUnit.path, cors(routerUnit.corsOptions), method);
              } else {
                router.delete(routerUnit.path, method);
              }
              break;
            case HttpRequestMethod.All:
              if (routerUnit.corsOptions) {
                router.all(routerUnit.path, cors(routerUnit.corsOptions), method);
              } else {
                router.all(routerUnit.path, method);
              }
              break;
            case HttpRequestMethod.Patch:
              if (routerUnit.corsOptions) {
                router.patch(routerUnit.path, cors(routerUnit.corsOptions), method);
              } else {
                router.patch(routerUnit.path, method);
              }
              break;
            case HttpRequestMethod.Options:
              router.options(routerUnit.path, method);
              break;
            default:
              loaded = false;
              break;
          }
        });

        const resourcePath = path + routerConfigPath;
        app.use(resourcePath, router);

        if (loaded) {
          loadedRoutes.push(routerConfig);
        }
      }

      resolve(loadedRoutes);
    });
  }

  protected setupSettings(): void {
    let port = config.port || 3000;
    let path = PathUtils.urlSanitation(config.path);

    this.app = config.app || express();


    app.set('case sensitive routing', settings['caseSentiveRouting'] || undefined);
    app.set('env', settings['env'] || 'development');
    app.set('etag', settings['etag'] || 'weak');
    app.set('jsonp callback name', settings['jsonpCallbackName'] || 'callback');
    app.set('json replacer', settings['jsonReplacer'] || undefined);
    app.set('json spaces', settings['jsonSpaces'] || undefined);
    app.set('query parser', settings['queryParser'] || 'extended');
    app.set('strict routing', settings['strictRouting'] || undefined);
    app.set('subdomain offset', settings['subdomainOffset'] || 2);
    app.set('trust proxy', settings['trustProxy'] || false);
    app.set('views', settings['views'] || process.cwd() + '/views');
    app.set('view engine', settings['viewEngine'] || undefined);
    app.set('x-powered-by', settings['xPoweredBy'] || false);

    if (settings['env'] === 'production') {
      app.set('view cache', settings['viewCache'] || true);
    } else {
      app.set('view cache', settings['viewCache'] || undefined);
    }

    // Express use configs
    this.addExpressMiddlewareConfig(config.use, this.app);

    // CORS
    this.addCors(config.corsConfig);
  }

  protected setupMiddleware(): void {
    if (!middlewareConfigs || middlewareConfigs.length === 0) {
      return;
    }

    if (!app) {
      throw new Error('Application must be defined!');
    }

    middlewareConfigs.forEach(midConfig => {
      app.use(midConfig);
    });
  }

  protected loadInterceptors(target: string, method: Function, methodName: string): Function {
    return function () {
      const req: Request = arguments[0];
      const res: Response = arguments[1];
      const next: NextFunction = arguments[2];

      let endpointArgs: any = [];

      let paramConfig: ParamConfig = ParameterLoader.getParameterConfig(target, methodName);
      if (paramConfig.params && paramConfig.params.length > 0) {
        paramConfig.params.forEach(function (param, index) {
          switch (param.type) {
            case ParamType.RequestParam:
              endpointArgs[param.parameterIndex] = req;
              break;
            case ParamType.ResponseParam:
              endpointArgs[param.parameterIndex] = res;
              break;
            case ParamType.NextParam:
              endpointArgs[param.parameterIndex] = next;
              break;
            case ParamType.PathParam:
              endpointArgs[param.parameterIndex] = req.params[param.paramName];
              break;
            case ParamType.QueryParam:
              endpointArgs[param.parameterIndex] = req.query[param.paramName];
              break;
            case ParamType.RequestParamMapper:
              let requestMapper: RequestMapper = new RequestMapper(req);
              endpointArgs[param.parameterIndex] = requestMapper;
              break;
          }
        });
      } else {
        endpointArgs = arguments;
      }

      let result: any;
      try {
        result = method.apply(this, endpointArgs);

        if (result) {
          res.contentType(result.getContentType());
          res.status(result.getHttpStatus()).send(result.toObjectLiteral());
        }

        next();
      } catch (e) {
        result = new DefaultResponse(false, null, MimeType.json, e.message, HttpResponseCode.INTERNAL_SERVER_ERROR);
        res.contentType(result.getContentType());
        res.status(result.getHttpStatus()).send(result.toObjectLiteral());
      }
    };
  }

  protected loadPreProcessors(app: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const loadedPreProcessors: InterceptorConfig[] = await
        this.loadInterceptorUnit(app, InterceptorType.PreProcessing);

      resolve(loadedPreProcessors);
    });
  }

  protected loadPostProcessors(app: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const loadedPostProcessors: InterceptorConfig[] =
        await this.loadInterceptorUnit(app, InterceptorType.PostProcessing);

      resolve(loadedPostProcessors);
    });
  }


  protected loadInterceptorUnit(app: Application, interceptorType: InterceptorType):
    InterceptorConfig[] {

    const loadedProcessors: any = [];

    if (!this.interceptorConfigs || this.interceptorConfigs.length === 0) {
      return loadedProcessors;
    }

    for (let index = 0; index < this.interceptorConfigs.length; index += 1) {
      const loaded: boolean = true;
      const interceptorConfig: InterceptorConfig = this.interceptorConfigs[index];

      const processorUnit = interceptorConfig.interceptorUnits.
        find(unit => unit.type === interceptorType);

      if (!processorUnit) {
        continue;
      }

      interceptorConfig.paths.forEach((path) => {
        const interceptorConfigPath = PathUtils.urlSanitation(path);

        app.use(interceptorConfigPath, processorUnit.classMethod);

        let loadedInterceptorConfig = loadedProcessors.
          find(config => config.path === interceptorConfigPath);

        if (!loadedInterceptorConfig) {
          loadedInterceptorConfig = {
            path: interceptorConfigPath,
            order: interceptorConfig.order,
            interceptorUnits: [],
          };

          loadedProcessors.push(loadedInterceptorConfig);
        }
        loadedInterceptorConfig.interceptorUnits.push(processorUnit);
      });
    }

    return loadedProcessors;
  }

}
