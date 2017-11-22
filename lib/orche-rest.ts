/**
 * @license
 * Copyright Mauricio Gemelli Vigolo.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { DecoratorLoader } from '@orchejs/common';
import { OrcheRestConfig, OrcheRestResult } from './interfaces';
import { OrcheEngine } from './constants';
import { ExpressEngine } from './engines';

export class OrcheRest {
  async init(config: OrcheRestConfig): Promise<OrcheRestResult> {
    const decoratorLoader = new DecoratorLoader();
    try {
      await decoratorLoader.loadDecorators(['Route', 'Interceptor', 'Property'], config.baseDir);
    } catch (e) {
      return Promise.reject(e);
    }

    let engine;
    switch (config.apiEngine) {
      default:
        engine = new ExpressEngine(config);
        break;
    }

    return engine.loadServer();
  }
}
