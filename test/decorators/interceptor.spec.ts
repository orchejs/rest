import { InterceptorConfig } from '../../lib/interfaces/interceptor-config';
import { InterceptorUnit } from '../../lib/interfaces/interceptor-unit';
import { hostname } from 'os';
import { expect } from 'chai';
import { Request } from 'express';
import { json } from 'body-parser';
import { RequestHelper } from '../helpers/request.helper';
import { ServerHelper } from '../helpers/server.helper';

import {
  Orche, OrcheConfig, OrcheEngines, OrcheResult,
} from '../../';


describe('Interceptor Decorators Tests', () => {

  let result: OrcheResult;

  before(async function () {
    this.timeout(0);
    result = await ServerHelper.init();
  });

  it('Should initialize the interceptors', () => {
    expect(result.stats.interceptorStats.loadedInterceptors.length).to.be.gt(0);
  });

  it('Should intercept HTTP GET Method of \'\orche/restricted\'', async () => {
    const result: string = await RequestHelper.get('/orche/restricted');
    expect(result).to.be.equal('{"authorization":"custom-token"}');
  });

});
