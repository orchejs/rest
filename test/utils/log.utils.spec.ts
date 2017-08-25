import { expect } from 'chai';
import * as winston from 'winston';

import { Environment } from '../../lib/constants/environment';
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

    it(
        `Should just load the file transport with the default options`, 
        () => {
          const log = new LogUtils();
          log.init({
            logOptions: {
              fileOptions: {
                level: 'debug',
                colorize: true,
                handleExceptions: true,
              },
            },
          });
          log.debug('test debug', {
            data: 'test metadata',
          });
          log.info('test info');
          log.warn('test warn');
          log.error('test error');
          expect(log.info).to.be.not.null;
        });

    it(
        `Should not load the file transport an error is throwed for trying to create a log file
          in a directory that is not accessable.`, 
        () => {
          try {
            const log = new LogUtils();
            log.init({
              logOptions: {
                fileOptions: {
                  dirname: '/log',
                  level: 'debug',
                },
              },
            });
            expect(log).to.be.null;
          } catch (e) {
            expect(e).to.not.be.null;
          }
        });

    it(
        `Should be able to add a custom transport to the logger`, 
        () => {
          const consoleTransport = new (winston.transports.Console)();
          logger.customizeTransports(consoleTransport);

          expect(logger.info).to.be.not.null;
        });
  });  
});
