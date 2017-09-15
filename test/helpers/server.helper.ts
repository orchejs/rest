import { Server } from 'http';
import { json } from 'body-parser';
import * as cors from 'cors';

import { OrcheRest, OrcheRestConfig, OrcheEngine, OrcheRestResult } from '../../';

export class ServerHelper {
  private static orcheResult: OrcheRestResult;

  static async initBasicServer(): Promise<OrcheRestResult> {
    if (!this.orcheResult) {
      const orche = new OrcheRest();

      const config: OrcheRestConfig = {
        path: '/orche',
        apiEngine: OrcheEngine.Restify,
        port: 8888,
        middlewares: [json()]
      };

      this.orcheResult = await orche.init(config);
    }

    return Promise.resolve(this.orcheResult);
  }

}
