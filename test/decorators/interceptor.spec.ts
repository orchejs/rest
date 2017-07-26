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

  before(async () => {
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

  it('Should initialize pre processing interceptors', () => {
    expect(result.stats.interceptorStats.loadedPreProcessingInterceptors.length).to.be.gt(0);
  });

  it('Should initialize post processing interceptors', () => {
    expect(result.stats.interceptorStats.loadedPostProcessingInterceptors.length).to.be.gt(0);
  });

  it('Should intercept PRE-PROCESSING a HTTP GET Method of \'\orche/restricted\'', async () => {
    const result: string = await RequestHelper.get('/orche/restricted');
    expect(result).to.be.equal('{"authorization":"custom-token"}');
  });  

  it('Should intercept POST-PROCESSING a HTTP GET Method of \'\orche/restricted\'', async () => {
    const result: string = await RequestHelper.get('/orche/restricted');
    expect(result).to.be.equal('{"authorization":"custom-token"}');
  }); 

});
