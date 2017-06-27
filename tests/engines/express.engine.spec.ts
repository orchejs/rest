import { ExpressEngine } from '../../lib/engines/express.engine';

describe('ExpressEngine', () => {
  let exEngine: ExpressEngine;

  before(() => {
    
  });

  describe('#loadServer', () => {
    it('Should initialize the express app with the default options', async () => {
      exEngine = new ExpressEngine();
      const server = await exEngine.loadServer();
    });
  });
});
