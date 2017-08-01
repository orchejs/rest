import { InterceptorConfig } from '../../lib/interfaces/interceptor-config';
import { InterceptorUnit } from '../../lib/interfaces/interceptor-unit';
import { hostname } from 'os';
import { expect } from 'chai';
import { Request } from 'express';
import { json } from 'body-parser';
import { RequestHelper } from '../helpers/request.helper';

import {
  Orche, OrcheConfig, OrcheEngines, OrcheResult,
} from '../../';


describe('Interceptor Decorators Tests', () => {

  let result: OrcheResult;

  before(async function () {
    this.timeout(0);
    
    const orche = new Orche();

    const config: OrcheConfig = {
      path: '/orche',
      apiEngine: OrcheEngines.ExpressJS,
      port: 8888,
      extensions: [
        json(),
      ]};

    result = await orche.init(config);
  });

  after((done) => {
    if (result.server) {
      result.server.close(() => {
        done();
      });
    }
  });

  it('Should initialize the interceptors', () => {
    expect(result.stats.interceptorStats.loadedInterceptors.length).to.be.gt(0);
  });

  it('Should intercept HTTP GET Method of \'\orche/restricted\'', async () => {
    const result: string = await RequestHelper.get('/orche/restricted');
    expect(result).to.be.equal('{"authorization":"custom-token"}');
  });

});
