import * as cors from 'cors';
import { Application, Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { FileMatcher, FindOptions } from 'file-matcher';

import { HttpResponseCode } from '../constants/httpresponsecode';
import { MimeType } from '../constants/mimetype';
import { ParamType } from '../constants/paramtype';
import { RouterConfig } from '../interfaces/routerconfig';
import { RouterUnit } from '../interfaces/routerunit';
import { ParamConfig } from '../interfaces/paramconfig';
import { ParameterLoader } from './parameter.loader';
import { PathUtils } from '../utils/path.utils';
import { HttpRequestMethod } from '../constants/httprequestmethod';
import { RequestMapper } from '../requests/requestmapper';


export class RouteLoader {

  private static routerConfigs: RouterConfig[] = [];
  private static routerUnits: RouterUnit[] = [];

  static addRouterConfig(className: string, path: string) {
    let routerConfig: RouterConfig = {
      path: path,
      className: className,
      routerUnits: this.routerUnits
    };

    this.routerConfigs.push(routerConfig);

    this.routerUnits = [];
  }

  static addRouteUnit(path: string, method: Function, methodName: string, httpMethod: HttpRequestMethod, corsOptions?: cors.CorsOptions, preflight?: boolean) {
    let routerUnit: RouterUnit = {
      path: path,
      methodName: methodName,
      method: method,
      httpMethod: httpMethod,
      corsOptions: corsOptions,
      preflight: preflight
    };

    this.routerUnits.push(routerUnit);
  }

  static loadRoutes(app: Application, path: string): Promise<any> {
    let loadedRoutes: Array<RouterConfig> = [];

    return new Promise((resolve, reject) => {
      if (!this.routerConfigs || this.routerConfigs.length === 0) {
        reject('There is no express route to configure!');
        return;
      }

      for (let index = 0; index < this.routerConfigs.length; index += 1) {
        let loaded: boolean = true;

        let routerConfig: RouterConfig = this.routerConfigs[index];

        let routerConfigPath = PathUtils.urlSanitation(routerConfig.path);

        let router: Router = Router();

        let routerUnits: Array<RouterUnit> = routerConfig.routerUnits;
        routerUnits.forEach(routerUnit => {
          let method: any = this.routerInterceptor(routerConfig.className, routerUnit.method, routerUnit.methodName);

          if (routerUnit.preflight) {
            router.options(routerUnit.path, cors(routerUnit.corsOptions));
          }

          switch (routerUnit.httpMethod) {
            case HttpRequestMethod.GET:
              if (routerUnit.corsOptions) {
                router.get(routerUnit.path, cors(routerUnit.corsOptions), method);
              } else {
                router.get(routerUnit.path, method);
              }
              break;
            case HttpRequestMethod.POST:
              if (routerUnit.corsOptions) {
                router.post(routerUnit.path, cors(routerUnit.corsOptions), method);
              } else {
                router.post(routerUnit.path, method);
              }
              break;
            case HttpRequestMethod.PUT:
              if (routerUnit.corsOptions) {
                router.put(routerUnit.path, cors(routerUnit.corsOptions), method);
              } else {
                router.put(routerUnit.path, method);
              }
              break;
            case HttpRequestMethod.HEAD:
              if (routerUnit.corsOptions) {
                router.head(routerUnit.path, cors(routerUnit.corsOptions), method);
              } else {
                router.head(routerUnit.path, method);
              }
              break;
            case HttpRequestMethod.DELETE:
              if (routerUnit.corsOptions) {
                router.delete(routerUnit.path, cors(routerUnit.corsOptions), method);
              } else {
                router.delete(routerUnit.path, method);
              }
              break;
            case HttpRequestMethod.ALL:
              if (routerUnit.corsOptions) {
                router.all(routerUnit.path, cors(routerUnit.corsOptions), method);
              } else {
                router.all(routerUnit.path, method);
              }
              break;
            case HttpRequestMethod.PATCH:
              if (routerUnit.corsOptions) {
                router.patch(routerUnit.path, cors(routerUnit.corsOptions), method);
              } else {
                router.patch(routerUnit.path, method);
              }
              break;
            case HttpRequestMethod.OPTIONS:
              router.options(routerUnit.path, method);
              break;
            default:
              loaded = false;
              break;
          }
        });

        let resourcePath = path + routerConfigPath;
        app.use(resourcePath, router);

        if (loaded) {
          loadedRoutes.push(routerConfig);
        }
      }

      resolve(loadedRoutes);
    });
  }

  static routerInterceptor(target: string, method: Function, methodName: string): Function {
    return function () {
      let req: Request = arguments[0];
      let res: Response = arguments[1];
      let next: NextFunction = arguments[2];

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

}
