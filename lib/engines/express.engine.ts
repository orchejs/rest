import * as express from 'express';
import * as cors from 'cors';
import * as http from 'http';
import { Engine } from './';
import {
  CompatVersions,
  OrcheRestConfig,
  OrcheRestResult,
  ExpressSettings,
  LoadStats,
  RouterUnit,
  RouterConfig
} from '../interfaces';
import { ExpressRouter } from '../routers';
import { ConfigUtils } from '../utils';

export class ExpressEngine extends Engine {
  constructor(userConfig?: OrcheRestConfig) {
    super(
      {
        dependency: 'express',
        from: '4.0.0',
        to: '4.20.0'
      },
      userConfig
    );
  }

  public loadServer(): Promise<OrcheRestResult> {
    return new Promise(async (resolve, reject) => {
      // Express initialization and setup
      this.app = express();

      // Add Express's settings
      this.setupSettings();
      // Add Express's extensions
      this.config.middlewares = this.config.middlewares || [];

      // Check if CORS should be setup and add it as an extension
      if (this.config.corsConfig) {
        const corsExtension = cors(this.config.corsConfig);
        this.config.middlewares.push(corsExtension);
      }
      this.setupExtensions();

      // Routes initialization
      const expressRouter: ExpressRouter = new ExpressRouter(this.app);
      const loadStats: LoadStats = expressRouter.loadRouters(this.config.path);

      this.server = this.app.listen(this.config.port, () => {
        // TODO add a logging library to the project
        const result: OrcheRestResult = {
          server: this.server,
          stats: loadStats
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
    const extensions = this.config.middlewares;
    if (!extensions || extensions.length === 0) {
      return;
    }

    extensions.forEach(extension => {
      this.app.use(extension);
    });
  }
}
