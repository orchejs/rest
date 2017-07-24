import { expect } from 'chai';
import { Request } from 'express';
import { json } from 'body-parser';
import { RequestHelper } from '../helpers/request.helper';

import { Orche, OrcheConfig, OrcheEngines, OrcheResult } from '../../';


describe('HTTP Decorators Tests', () => {

  let result: OrcheResult;

  before(async () => {
    const orche = new Orche();

    const config: OrcheConfig = {
      path: '/orche-test',
      apiEngine: OrcheEngines.ExpressJS,
      port: 8888,
      extensions: [
        json(),
      ]};

    result = await orche.init(config);
  });

  it('Should initialize routes', () => {
    expect(result.stats.routerStats.loadedRoutes.length).to.be.gt(0);
  });

  it('Should make an http GET to /orche-test/utilities and receive \'ping\'', async () => {
    const result: string = await RequestHelper.get('/orche-test/utilities');
    expect(result).to.be.equal('{"msg":"ping"}');
  });

  it('Should make an http POST to /orche-test/utilities and receive \'ping {ip}\'', async () => {
    const result: string = await RequestHelper.post('/orche-test/utilities',
                                                    { ip: '192.168.0.21' });
    expect(result).to.be.equal('{"msg":"pinging 192.168.0.21"}');
  });

  it('Should make an http PUT to /orche-test/utilities and receive \'ping {ip}\'', async () => {
    const result: string = await RequestHelper.put('/orche-test/utilities',
                                                   { ip: '192.168.0.21' });
    expect(result).to.be.equal('{"msg":"pinging 192.168.0.21"}');
  });

  it('Should make an http DELETE to /orche-test/utilities/{ip}', async () => {
    const result: string = await RequestHelper.delete('/orche-test/utilities/192.168.0.21');
    expect(result).to.be.equal('{"msg":"delete ip: 192.168.0.21"}');
  });

  it('Should make an http PATCH to /orche-test/utilities and receive \'ping {ip}\'', async () => {
    const result: string = await RequestHelper.patch('/orche-test/utilities',
                                                     { ip: '192.168.0.21' });
    expect(result).to.be.equal('{"msg":"pinging 192.168.0.21"}');
  });

  it('Should make an http OPTIONS to /orche-test/utilities', async () => {
    const result: string = await RequestHelper.options('/orche-test/utilities');
    expect(result).to.be.equal('');
  });

  it('Should make an http HEAD to /orche-test/utilities', async () => {
    const result: string = await RequestHelper.head('/orche-test/utilities');
    expect(result).to.be.equal('');
  });    
});
