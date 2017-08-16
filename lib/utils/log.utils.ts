import * as winston from 'winston';
import * as moment from 'moment';

import { PathUtils } from './path.utils';

export class LogUtils {

  private log: any;
  private filename: string;

  constructor() {
    if (!this.filename) {
      this.filename = `${PathUtils.appDirName}-${moment().format('YYYYMMDDHHmmss')}.log`;
    }

    winston.configure({
      transports:[
        new (winston.transports.Console)({
          colorize: true,
        }),
        new (winston.transports.File)({ filename: this.filename }),
      ],
    });
  }

  info(msg: string) {

  }

  error(msg: string) {

  }

  warn(msg: string) {

  }

  debug(msg: string) {

  }

  customizeLoggerLibrary(): any {
    return winston;
  }
}

export const logger: LogUtils = new LogUtils();
