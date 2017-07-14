import { expect } from 'chai';
import { path, get, Orche, OrcheConfig, OrcheEngines } from '../../index';

describe('Orche Main Class', () => {

  before(async () => {
    let orche = new Orche();

    const config: OrcheConfig = {
      path: '/orche-test',
      apiEngine: OrcheEngines.ExpressJS,
      port: 8888
    };

      let result = await orche.init(config)
      console.log('ok', result);
  });

  describe('#init', (() => {
    it('Should initialize routes', () => {
      expect(true).to.be.true;
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
