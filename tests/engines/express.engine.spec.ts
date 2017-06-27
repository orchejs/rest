import { ExpressEngine } from '../../lib/engines/express.engine';

describe('ExpressEngine', () => {
  let exEngine: ExpressEngine;

  before(() => {
    exEngine = new ExpressEngine();    
  });

  describe('#loadServer', () => {
    it('Should initialize the express app with the default options', async () => {
      try {
        const server = await exEngine.loadServer();
      } catch (error) {
        // TODO tratar result
      }
    });
  });
});
