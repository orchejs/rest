import { OrcheRestConfig, OrcheRestResult } from './interfaces';
import { OrcheEngine } from './constants';
import { DecoratorLoader } from './loaders';
import { ExpressEngine, RestifyEngine } from './engines';

export class OrcheRest {
  async init(config: OrcheRestConfig): Promise<OrcheRestResult> {
    const decoratorLoader = new DecoratorLoader();
    await decoratorLoader.loadDecorators();

    let engine;
    switch (config.apiEngine) {
      /*
      case OrcheEngine.Hapi:
        break;
      case OrcheEngine.Koa:
        break;
      */
      case OrcheEngine.Restify:
        engine = new RestifyEngine(config);
        break;
      default:
        engine = new ExpressEngine(config);
        break;
    }

    return engine.loadServer();
  }
}
