import { hostname } from 'os';
import { expect } from 'chai';
import { Request } from 'express';
import { json } from 'body-parser';
import { get as httpGet, request, RequestOptions } from 'http';

import { path, post, put, del, get, Orche, OrcheEngines, OrcheResult, 
         OrcheConfig, GenericResponse, pathParam, requestParam } from '../';


describe('Orche Main Class', () => {

  let result: OrcheResult;

  before(async () => {
    const orche = new Orche();

    const config: OrcheConfig = {
      path: '/orche-test',
      apiEngine: OrcheEngines.ExpressJS,
      port: 8888,
      extensions: [json()] };

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

    it('Should make an http POST to /orche-test/utilities and receive \'ping {ip}\''
      ,(done) => {
        const data = JSON.stringify({ ip: '192.189.0.21' });

        const options: RequestOptions = {
          protocol: 'http:',
          host: 'localhost',
          port: 8888,
          method: 'POST',
          path: '/orche-test/utilities',
          headers: { 'Content-Type': 'application/json' }};

        const req = request(options, (res) => {
          let rawData: any = '';

          res.on('data', (chunk) => {
            rawData += chunk;
          });

          res.on('error', (error) => {
            console.log(error);
            done();
          });

          res.on('end', () => {
            console.log(rawData);
            expect(rawData).to.be.equal('{"msg":"pinging 192.189.0.21}');
            done();
          });
        });

        req.write(data);
        req.end();
      });
  });
});

@path('/utilities')
class Utilities {

  @get()
  justPing() {
    return { msg: 'ping' };
  }

  @post()
  postPing(@requestParam() request): GenericResponse {
    let ip: string = '';
    if (request.body) {
      ip = request.body['ip'];
    }
    const response: GenericResponse = new GenericResponse({ msg: `pinging ${ip}` });
    return response;
  }

}
