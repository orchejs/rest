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
      path: '/orche-decorators',
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

  it('Should make an http GET to /orche-decorators/utilities and receive \'ping\'', async () => {
    const result: string = await RequestHelper.get('/orche-decorators/utilities');
    expect(result).to.be.equal('{"msg":"ping"}');
  });

  it('Should make an http POST to /orche-decorators/utilities and receive \'ping {ip}\'', async () => {
    const result: string = await RequestHelper.post('/orche-decorators/utilities',
                                                    { ip: '192.168.0.21' });
    expect(result).to.be.equal('{"msg":"pinging 192.168.0.21"}');
  });

  it('Should make an http PUT to /orche-decorators/utilities and receive \'ping {ip}\'', async () => {
    const result: string = await RequestHelper.put('/orche-decorators/utilities',
                                                  { ip: '192.168.0.21' });
    expect(result).to.be.equal('{"msg":"pinging 192.168.0.21"}');
  });

  it('Should make an http DELETE to /orche-decorators/utilities/{ip}', async () => {
    const result: string = await RequestHelper.delete('/orche-decorators/utilities/192.168.0.21');
    expect(result).to.be.equal('{"msg":"delete ip: 192.168.0.21"}');
  });

  it('Should make an http PATCH to /orche-decorators/utilities and receive \'ping {ip}\'', async () => {
    const result: string = await RequestHelper.patch('/orche-decorators/utilities',
                                                    { ip: '192.168.0.21' });
    expect(result).to.be.equal('{"msg":"pinging 192.168.0.21"}');
  });

  it('Should make an http OPTIONS to /orche-decorators/utilities', async () => {
    const result: string = await RequestHelper.options('/orche-decorators/utilities');
    expect(result).to.be.equal('');
  });

  it('Should make an http HEAD to /orche-decorators/utilities', async () => {
    const result: string = await RequestHelper.head('/orche-decorators/utilities');
    expect(result).to.be.equal('');
  });    
});
