import * as express from 'express';
import * as cors from 'cors';
import * as http from 'http';

import { Engine } from './engine';
import { CompatVersions } from '../interfaces/compat-versions';
import { OrcheConfig } from '../interfaces/orche-config';
import { OrcheResult } from '../interfaces/orche-result';
import { ExpressSettings } from '../interfaces/express-settings';
import { LoadRouterStats } from '../interfaces/load-router-stats';
import { LoadInterceptorStats } from '../interfaces/load-interceptor-stats';
import { LoadStats } from '../interfaces/load-stats';
import { RouterUnit } from '../interfaces/router-unit';
import { RouterConfig } from '../interfaces/router-config';
import { InterceptorConfig } from '../interfaces/interceptor-config';
import { ExpressInterceptor } from '../interceptors/express.interceptor';
import { ExpressRouter } from '../routers/express.router';
import { PathUtils } from '../utils/path.utils';


export class ExpressEngine extends Engine {

  constructor(userConfig?: OrcheConfig) {
    super(
      {
        dependency: 'express', 
        from: '4.0.0', 
        to: '4.20.0',
      },
      userConfig,
    );
  }

  public loadServer(): Promise<OrcheResult> {
    return new Promise(async (resolve, reject) => {
      // Express initialization and setup
      this.app = express();

      // Add Express's settings
      this.setupSettings();
      // Add Express's extensions
      this.config.extensions = this.config.extensions || [];

      // Check if CORS should be setup and add it as an extension
      if (this.config.corsConfig) {
        const corsExtension = cors(this.config.corsConfig);
        this.config.extensions.push(corsExtension);
      }
      this.setupExtensions();

      // Interceptors initialization
      const interceptorStats: LoadInterceptorStats = {};
      const expressInterceptor: ExpressInterceptor = new ExpressInterceptor(this.app);

      // Loading preprocessing interceptors
      try {
        const interceptorStats: LoadInterceptorStats = await expressInterceptor.loadProcessors();

        interceptorStats.initializationTime = preInterceptorStats.initializationTime;
        interceptorStats.loadedPreProcessingInterceptors = preInterceptorStats.
          loadedPreProcessingInterceptors;
      } catch (error) {
        const msg = `Error while loading the pre processing interceptors. Details: ${error.stack}`;
        reject(msg);
        return;
      }

      // Routes initialization
      const expressRouter: ExpressRouter = new ExpressRouter(this.app);
      let routerStats: LoadRouterStats;
      try {
        routerStats = await expressRouter.loadRoutes(this.config.path);
      } catch (error) {
        const msg = `Error while loading the app routes. Details: ${error.stack}`;
        reject(msg);
        return;
      }

      this.server = this.app.listen(this.config.port, () => {
        // TODO add a logging library to the project
        const loadStats: LoadStats = {};
        loadStats.interceptorStats = interceptorStats;
        loadStats.routerStats = routerStats;

        const result: OrcheResult = {
          server: this.server,
          stats: loadStats,
        };

        resolve(result);
      });
    });
  }

  protected setupSettings(): void {
    const settings = this.config.settings || {};

    this.app.set('case sensitive routing', settings['caseSentiveRouting'] || undefined);
    this.app.set('env', settings['env'] || 'development');
    this.app.set('etag', settings['etag'] || 'weak');
    this.app.set('jsonp callback name', settings['jsonpCallbackName'] || 'callback');
    this.app.set('json replacer', settings['jsonReplacer'] || undefined);
    this.app.set('json spaces', settings['jsonSpaces'] || undefined);
    this.app.set('query parser', settings['queryParser'] || 'extended');
    this.app.set('strict routing', settings['strictRouting'] || undefined);
    this.app.set('subdomain offset', settings['subdomainOffset'] || 2);
    this.app.set('trust proxy', settings['trustProxy'] || false);
    this.app.set('views', settings['views'] || process.cwd() + '/views');
    this.app.set('view engine', settings['viewEngine'] || undefined);
    this.app.set('x-powered-by', settings['xPoweredBy'] || false);

    if (settings['env'] === 'production') {
      this.app.set('view cache', settings['viewCache'] || true);
    } else {
      this.app.set('view cache', settings['viewCache'] || undefined);
    }
  }

  protected setupExtensions(): void {
    const extensions = this.config.extensions;
    if (!extensions || extensions.length === 0) {
      return;
    }

    extensions.forEach((extension) => {
      this.app.use(extension);
    });
  }
}
