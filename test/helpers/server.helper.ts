import { json } from 'body-parser';
import * as cors from 'cors';

import {
  Orche, OrcheConfig, OrcheEngines, OrcheResult, 
} from '../../';

export class ServerHelper {

  private static result: OrcheResult;

  static async initBasicServer(): Promise<OrcheResult> {
    if (!this.result) {
      const orche = new Orche();

      const config: OrcheConfig = {
        path: '/orche',
        apiEngine: OrcheEngines.ExpressJS,
        port: 8888,
        extensions: [
          json(),
        ]};

      this.result = await orche.init(config);
    }

    return Promise.resolve(this.result);
  }

}
