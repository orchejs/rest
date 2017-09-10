import { OrcheConfig } from './interfaces/orche-config';
import { OrcheResult } from './interfaces/orche-result';
import { DecoratorLoader } from './loaders/decorator.loader';
import { OrcheEngine } from './constants/orche-engine';
import { ExpressEngine } from './engines/express.engine';

export class Orche {

  async init(config: OrcheConfig): Promise<OrcheResult> {
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
