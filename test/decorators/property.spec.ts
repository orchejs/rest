import { Student } from '../sandbox/resources/student';
import { expect } from 'chai';
import { Request } from 'express';
import { json } from 'body-parser';
import { RequestHelper } from '../helpers/request.helper';
import { ServerHelper } from '../helpers/server.helper';

import { Orche, OrcheConfig, OrcheEngines, OrcheResult } from '../../';


describe('Property Decorator Tests', () => {

  let result: OrcheResult;

  before(async function () {
    this.timeout(0);
    result = await ServerHelper.initBasicServer();
  });

  it('Should make an http POST to /orche/classrooms and receive the response', async () => {
    const result: string = await RequestHelper.post('/orche/classrooms', { name: undefined });
    expect(result).to.be.equal('{"say":"hi"}');
  });
});
