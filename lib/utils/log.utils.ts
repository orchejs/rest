import * as winston from 'winston';
import * as moment from 'moment';

import { Environment } from '../constants/environment';
import { LogOptions } from '../interfaces/log-options';
import { OrcheConfig } from '../interfaces/orche-config';
import { PathUtils } from './path.utils';

export class LogUtils {

  private log: any;
  private transports: winston.TransportInstance[];

  constructor() {
    this.transports = [];
  }

  public init(appConfig: OrcheConfig): void {
    const logOptions: LogOptions = appConfig.logOptions || {};

    if (logOptions.disableLog) {
      return;
    }

    /**
     * Console log is enabled when:
     *  - the app is in debug mode
     *  - if consoleOptions is defined
     *  - if fileOptions was not informed and it's not production
     */
    if ((appConfig.environment !== Environment.Production) && 
        (appConfig.debug || logOptions.consoleOptions || !logOptions.fileOptions)) {
      logOptions.consoleOptions = this.loadConsoleOptions(logOptions.consoleOptions);
      const consoleTransport = new (winston.transports.Console)(logOptions.consoleOptions);
      this.transports.push(consoleTransport);
    }

    /**
     * File log is enabled when:
     *  - the app is running in production
     *  - if fileOptions is defined
     */
    if ((appConfig.environment === Environment.Production) || logOptions.fileOptions) {
      logOptions.fileOptions = this.loadFileOptions(logOptions.fileOptions);
      const fileTransport = new (winston.transports.File)(logOptions.fileOptions);
      this.transports.push(fileTransport);
    }

    this.log = new (winston.Logger)({ transports: this.transports });
  }

  private loadConsoleOptions(consoleOptions: winston.ConsoleTransportOptions): 
    winston.ConsoleTransportOptions {
    const options: winston.ConsoleTransportOptions = consoleOptions || {};
    options.level = options.level || 'info';
    options.prettyPrint = options.prettyPrint || true;
    options.handleExceptions = options.handleExceptions || true;
    options.humanReadableUnhandledException = options.humanReadableUnhandledException || true;
    options.formatter = options.formatter || this.defaultFormatter;
    return options;
  }

  private loadFileOptions(fileOptions: winston.FileTransportOptions):
    winston.FileTransportOptions {
    const options: winston.FileTransportOptions = fileOptions || {};
    return options;
  }

  private defaultFormatter(options): string {
    return moment().format('YYYY-MM-DD HH:mm:sss') + ' - ' + options.level.toUpperCase() 
      + ' - ' + (options.message ? options.message : '') + 
      (options.meta && Object.keys(options.meta).length ? '\n\t' 
        + JSON.stringify(options.meta) : '');
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

const logger: LogUtils = new LogUtils();
export { logger };
