import { expect } from 'chai';
import { get as httpGet, request } from 'http';

import { path, post, put, del, get, Orche, OrcheEngines, OrcheResult, 
         OrcheConfig, GenericResponse, pathParam } from '../';


describe('Orche Main Class', () => {

  let result: OrcheResult;

  before(async () => {
    const orche = new Orche();

    const config: OrcheConfig = {
      path: '/orche-test',
      apiEngine: OrcheEngines.ExpressJS,
      port: 8888,
    };

    result = await orche.init(config);
  });

  describe('#init', () => {
    it('Should initialize routes', () => {
      expect(result.stats.routerStats.loadedRoutes.length).to.be.gt(0);
    });

    it('Should make an http GET to /orche-test/utilities and receive \'ping\'', (done) => {
      httpGet('http://localhost:8888/orche-test/utilities', (res) => {
        let rawData: any = '';

        res.on('data', (chunk) => {
          rawData += chunk;
        });

        res.on('end', () => {
          expect(rawData).to.be.equal('{"msg":"ping"}');
          done();
        });
      });
    });

    /*
    it('Should make an http GET to /orche-test/utilities and receive \'ping\'', (done) => {
      httpGet('http://localhost:8888/orche-test/utilities', (res) => {
        let rawData: any = '';

        res.on('data', (chunk) => {
          rawData += chunk;
        });

        res.on('end', () => {
          expect(rawData).to.be.equal('{"msg":"ping"}');
          done();
        });
      });
    });    
    */
  });
});

@path('/utilities')
class Utilities {

  @get()
  justPing() {
    return { msg: 'ping' };
  }

  @post()
  postPing(@pathParam('ip') ip: string): GenericResponse {
    const response: GenericResponse = new GenericResponse({ msg: 'pinging ' + ip });
    return response;
  }

}
