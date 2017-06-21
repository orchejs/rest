import { EventEmitter } from 'events';

import { OrcheConfig } from './interfaces/orche-config';
import { DecoratorLoader } from './loaders/decorator.loader';

export class Orche extends EventEmitter {

  constructor() {
    super();
  }

  init(config: OrcheConfig): void {
    const decoratorLoader = new DecoratorLoader();
    decoratorLoader.loadDecorators()
      .then(() => {

      })
      .catch((e) => {

      });
  }

}
