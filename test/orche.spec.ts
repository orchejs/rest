import { path } from '../lib/decorators/path';
import { get } from '../lib/decorators/http';
import { Orche } from '../lib/orche';
import { OrcheEngines } from '../lib/constants/orche-engines';
import { OrcheResult } from '../lib/interfaces/orche-result';
import { OrcheConfig } from '../lib/interfaces/orche-config';
import { expect } from 'chai';


describe('Orche Main Class', () => {

  let result: OrcheResult;

  before(async () => {
    let orche = new Orche();

    const config: OrcheConfig = {
      path: '/orche-test',
      apiEngine: OrcheEngines.ExpressJS,
      port: 8888
    };

    result = await orche.init(config)
  });

  describe('#init', (() => {
    it('Should initialize routes', () => {
      expect(result.stats.routerStats.loadedRoutes.length).to.be.gt(0);
    });
  }));

});

@path('/utilities')
class Utilities {

  @get()
  justPing() {
    return { msg: 'ping' };
  }

}
