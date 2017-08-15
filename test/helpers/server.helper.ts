import { json } from 'body-parser';

import {
  Orche, OrcheConfig, OrcheEngines, OrcheResult,
} from '../../';

export class ServerHelper {

  private static result: OrcheResult;

  static init(): Promise<OrcheResult> {
    return new Promise(async (resolve, reject) => {
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
  
      resolve(this.result);
    });
  }
}
