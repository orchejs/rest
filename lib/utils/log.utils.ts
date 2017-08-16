import * as winston from 'winston';
import * as moment from 'moment';

import { PathUtils } from './path.utils';

class LogUtils {

  private static log: any;
  public filename: string;

  private constructor() {
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

  static setLogFileName(fileName: string) {

  }

  static info(msg: string) {

  }

  static error(msg: string) {

  }

  static warn(msg: string) {

  }

  static debug(msg: string) {

  }

}

export { LogUtils as log };
