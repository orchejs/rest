import { Environment } from '@orchejs/common';
import { expect } from 'chai';
import { ExpressEngine } from '../../lib/engines';
import { OrcheRestConfig, ExpressSettings, OrcheRestResult } from '../..';

describe('ExpressEngine', () => {
  describe('#loadServer', () => {
    it('Should load server without routes in debug mode and adding cors', async () => {
      const settings: ExpressSettings = {
        xPoweredBy: false,
        caseSentiveRouting: false,
        env: 'development'
      };

      const config: OrcheRestConfig = {
        settings,
        baseDir: '/test/engines',
        debug: true,
        corsConfig: {
          methods: 'GET'
        },
        path: 'orche-express-test',
        port: 5000,
        logOptions: {
          disableLog: true
        }
      };

      const expressEngine: ExpressEngine = new ExpressEngine(config);
      const result: OrcheRestResult = await expressEngine.loadServer();
      expect(result.server).to.be.not.undefined;
    });

    it('Should load server without middlewares, cors and in production mode', async () => {
      const config: OrcheRestConfig = {
        baseDir: '/test/engines',
        debug: true,
        path: 'orche-express-test',
        port: 5001,
        environment: Environment.Production,
        logOptions: {
          disableLog: true
        }
      };

      const expressEngine: ExpressEngine = new ExpressEngine(config);
      const result: OrcheRestResult = await expressEngine.loadServer();
      expect(result.server).to.be.not.undefined;
    });    
  });
});
