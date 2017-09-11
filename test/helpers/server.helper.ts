import { Server } from 'http';
import { json } from 'body-parser';
import * as cors from 'cors';

import { Orche, OrcheConfig, OrcheEngine, OrcheResult } from '../../';

export class ServerHelper {
  private static orcheResult: OrcheResult;

  static async initBasicServer(): Promise<OrcheResult> {
    if (!this.orcheResult) {
      const orche = new Orche();

      const config: OrcheConfig = {
        path: '/orche',
        apiEngine: OrcheEngine.ExpressJS,
        port: 8888,
        middlewares: [json()]
      };

      this.orcheResult = await orche.init(config);
    }

    return Promise.resolve(this.orcheResult);
  }

}
