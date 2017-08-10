import { expect } from 'chai';
import { Request } from 'express';
import { json } from 'body-parser';
import { RequestHelper } from '../helpers/request.helper';
import { ServerHelper } from '../helpers/server.helper';

import { Orche, OrcheConfig, OrcheEngines, OrcheResult, queryParam } from '../../';


describe('Parameter Decorators Tests', () => {

  let result: OrcheResult;

  before(async function () {
    this.timeout(0);
    result = await ServerHelper.init();
  });

  it('Should test req, res, next, query params and result calledNext === true', async () => {
    const result: string = await RequestHelper.get('/orche/reports');
    expect(result).to.be.equal('{"calledNext":true}');
  });

  it('Should test path para and get the result uuid === 123456', async () => {
    const result: string = await RequestHelper.get('/orche/reports/123456');
    expect(result).to.be.equal('{"uuid":"123456"}');
  });

  it('Should test RequestMapper returning the passed values', async () => {
    const queryParams = '?columns=column1,column2&' +
                        'expand=resource1,resource2&' +
                        'page=1&' +
                        'sort=%2bfield1,field2-&' +
                        'start=10';

    const queryUrl: string = '/orche/reports/custom/reports' + queryParams;
    const result: any = await RequestHelper.get(queryUrl);
    expect(result).to.be.equal('{"columns":["column1","column2"],"expand":["resource1",' + 
      '"resource2"],"sort":[{"name":"field1","type":0},{"name":"field2","type":1}],"start":"10"}');
  });

  it('Should test bodyParam and return report value posted', async () => {
    const result: string = await RequestHelper.post('/orche/reports', { reportUuid: 1 });
    expect(result).to.be.equal('{"report":1}');
  });

});
