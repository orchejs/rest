import * as express from 'express';
import * as cors from 'cors';
import * as http from 'http';


import { Engine } from './engine';
import { CompatVersions } from '../interfaces/compat-versions';
import { OrcheConfig } from '../interfaces/orche-config';
import { ExpressSettings } from '../interfaces/express-settings';
import { ExpressRoute } from '../routers/express.router';
import { RouterUnit } from '../interfaces/router-unit';
import { RouterConfig } from '../interfaces/router-config';
import { InterceptorConfig } from '../interfaces/interceptor-config';
import { InterceptorLoader } from '../loaders/interceptor.loader';
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
