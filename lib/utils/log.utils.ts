import { Environment } from '../constants/environment';
import { LogOptions } from '../interfaces/log-options';
import * as winston from 'winston';
import * as moment from 'moment';

import { appConfig } from './config.utils';
import { PathUtils } from './path.utils';

export class LogUtils {

  private log: any;
  private transports: winston.TransportInstance[];

  constructor() {
    this.transports = [];
    this.init();
  }

  private init(): void {
    const logOptions = appConfig.logOptions;

    if (!logOptions.enableLog) {
      return;
    }

    /**
     * Console log is enabled when:
     *  - the app is in debug mode
     *  - if consoleOptions has values
     *  - if fileOptions was not informed and it's not production
     */
    if ((appConfig.environment !== Environment.Production) && 
        (appConfig.debug || logOptions.consoleOptions || !logOptions.fileOptions)) {
      logOptions.consoleOptions = this.loadConsoleOptions(logOptions.consoleOptions);
      const consoleTransport = new (winston.transports.Console)(logOptions.consoleOptions);
      this.transports.push(consoleTransport);
    }
  }

  private loadConsoleOptions(consoleOptions: winston.ConsoleTransportOptions): 
    winston.ConsoleTransportOptions {
    const options: winston.ConsoleTransportOptions = consoleOptions || {};
    options.level = options.level || 'info';
    options.name = options.name || 'console';
    options.prettyPrint = options.prettyPrint || true;
    options.handleExceptions = options.handleExceptions || true;
    options.humanReadableUnhandledException = options.humanReadableUnhandledException || true;
    options.formatter = options.formatter || this.defaultFormatter;
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

export const logger: LogUtils = new LogUtils();
