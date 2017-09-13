import { OrcheRestConfig, OrcheRestResult } from './interfaces';
import { OrcheEngine } from './constants';
import { DecoratorLoader } from './loaders';
import { ExpressEngine } from './engines';

export class OrcheRest {
  async init(config: OrcheRestConfig): Promise<OrcheRestResult> {
    const decoratorLoader = new DecoratorLoader();
    await decoratorLoader.loadDecorators();

    let engine;
    switch (config.apiEngine) {
      /*
      case OrcheEngines.Hapi:
        break;
      case OrcheEngines.Koa:
        break;
      case OrcheEngines.Restify:
        break;
      */
      default:
        engine = new ExpressEngine(config);
        break;
    }

    return engine.loadServer();
  }
}
