import { CorsOptions } from '../../lib/interfaces/cors-options';
import { OrcheConfig } from '../..';
import { expect } from 'chai';
import { ExpressEngine } from '../../lib/engines/express.engine';

describe('ExpressEngine', () => {

  describe('#loadServer', () => {
    it('Should initialize the express app with the default options', async () => {
      const exEngine: ExpressEngine = new ExpressEngine();        
      const results = await exEngine.loadServer();

      expect(results).to.not.undefined;

      results.server.close();
    });

    it('Should initialize the express app with cors and production ready', async () => {
      const orcheCfg: OrcheConfig = {
        settings: {
          env: 'production' },
        corsConfig: { methods: '*' } };

      const exEngine: ExpressEngine = new ExpressEngine(orcheCfg);
      const results = await exEngine.loadServer();

      expect(results).to.not.undefined;
    });
  });
});
