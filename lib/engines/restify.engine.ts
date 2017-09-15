import { Engine } from './';
import * as restify from 'restify';
import { RestifyRouter } from '../routers';
import { OrcheRestResult, OrcheRestConfig, LoadStats } from '../interfaces';

export class RestifyEngine extends Engine {
  private restifySettings: restify.ServerOptions;

  constructor(userConfig?: OrcheRestConfig) {
    super(
      {
        dependency: 'restify',
        from: '5.0.0',
        to: '5.2.0'
      },
      userConfig
    );
  }

  public loadServer(): Promise<OrcheRestResult> {
    return new Promise(async (resolve, reject) => {
      // Add Express's settings
      this.setupSettings();

      // Restify initialization and setup
      this.app = restify.createServer(this.restifySettings);

      // Add Express's extensions
      this.config.middlewares = this.config.middlewares || [];

      // Check if CORS should be setup and add it as an extension
      if (this.config.corsConfig) {
        // const corsExtension = cors(this.config.corsConfig);
        // this.config.middlewares.push(corsExtension);
      }
      this.setupExtensions();

      // Routes initialization
      const restifyRouter: RestifyRouter = new RestifyRouter(this.app);
      const loadStats: LoadStats = restifyRouter.loadRouters(this.config.path);

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
    // throw new Error('Method not implemented.');
  }

  protected setupExtensions(): void {
    // throw new Error('Method not implemented.');
  }
}
