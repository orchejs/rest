import { OrcheRest } from '../';
import { expect } from 'chai';

describe('OrcheRest', () => {
  describe('#init', () => {
    it('Should throw error if no decorators were found', async () => {
      const orche = new OrcheRest();
      try {
        await orche.init({
          baseDir: '/unknown-path/orche-path'
        });
      } catch (error) {
        expect(error).to.be.not.undefined;
      }
    });
  });
});
