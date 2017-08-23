import { Environment } from '../../lib/constants/environment';
import { expect } from 'chai';
import { LogUtils, logger } from '../../lib/utils/log.utils';

describe('LogUtils', () => {
  describe('#constructor', () => {
    it('Should initialize the LogUtils object with the default options, just console', () => {
      const log = new LogUtils();
      expect(log.info).to.be.not.null;
    });
  });

  describe('#init', () => {
    it(
      `Should not initialize the log if the disableLog option is true, however the log methods 
       should still be available`, 
      () => {
        const log = new LogUtils();
        log.init({ logOptions: {
          disableLog: true,
        }});
        expect(log.info).to.be.not.null;
      });

    it(
        `Should initialize in production mode with an instance of file transport and not console`, 
        () => {
          const log = new LogUtils();
          log.init({
            environment: Environment.Production,
          });
          expect(log.info).to.be.not.null;
        });      
  });  
});
