import { expect } from 'chai';
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
        expect(server).to.not.undefined;
      } catch (error) {
        expect(error).to.undefined;
      }
    });
  });
});
