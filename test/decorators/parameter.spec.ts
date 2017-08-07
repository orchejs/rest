import { expect } from 'chai';
import { Request } from 'express';
import { json } from 'body-parser';
import { RequestHelper } from '../helpers/request.helper';
import { ServerHelper } from '../helpers/server.helper';

import {
  Orche, OrcheConfig, OrcheEngines, OrcheResult,
} from '../../';


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
    const columns: string = 'columns=column1, column2';
    const expand: string = 'expand=resource1, resource2';
    const limit: string = 'limit';
    const sort: string = '';
    const start: string = '';
    const queryUrl: string = '/orche/reports/custom?columns=column1,column2&expand=test1,test2&';
    const result: any = await RequestHelper.get(queryUrl);
  });

});
