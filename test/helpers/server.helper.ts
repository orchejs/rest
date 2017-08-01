import { json } from 'body-parser';

import {
  Orche, OrcheConfig, OrcheEngines, OrcheResult,
} from '../../';

export class ServerHelper {

  private static server: OrcheResult;

  static async init(): Promise<OrcheResult> {
    if (!this.server) {
      const orche = new Orche();

      const config: OrcheConfig = {
        path: '/orche',
        apiEngine: OrcheEngines.ExpressJS,
        port: 8888,
        extensions: [
          json(),
        ]};

      this.server = await orche.init(config);
    }

    return this.server;
  }

}
