import { Engine } from './';
import { KoaRouter } from '../routers';
import { OrcheRestResult, OrcheRestConfig, LoadStats } from '../interfaces';

export class KoaEngine extends Engine {
  constructor(userConfig?: OrcheRestConfig) {
    super(
      {
        dependency: 'koa',
        from: '',
        to: ''
      },
      userConfig
    );
  }

  public loadServer(): Promise<OrcheRestResult> {
    return new Promise(async (resolve, reject) => {
      // Hapi's initialization and setup
      // this.app = new hapi.Server();

      // Add Express's settings
      this.setupSettings();
      // Add Express's extensions
      this.config.middlewares = this.config.middlewares || [];

      // Check if CORS should be setup and add it as an extension
      if (this.config.corsConfig) {
        // const corsExtension = cors(this.config.corsConfig);
        // this.config.middlewares.push(corsExtension);
      }
      this.setupExtensions();

      // Routes initialization
      // const hapiRouter: HapiRouter = new HapiRouter(this.app);
      // const loadStats: LoadStats = hapiRouter.loadRouters(this.config.path);

      this.server = this.app.listen(this.config.port, () => {
        // TODO add a logging library to the project
        // const result: OrcheRestResult = {
        //  server: this.server,
        //  stats: loadStats
        // };

        // resolve(result);
      });
    });
  }

  protected setupSettings(): void {
    throw new Error('Method not implemented.');
  }

  protected setupExtensions(): void {
    throw new Error('Method not implemented.');
  }
}
