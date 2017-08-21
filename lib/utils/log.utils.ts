import * as winston from 'winston';
import * as moment from 'moment';
import * as path from 'path';

import { Environment } from '../constants/environment';
import { LogOptions } from '../interfaces/log-options';
import { OrcheConfig } from '../interfaces/orche-config';
import { PathUtils } from './path.utils';

export class LogUtils {

  private log: any;
  private env: Environment;
  private transports: winston.TransportInstance[];

  constructor() {
    this.transports = [];
    this.init();
  }

  public init(appConfig: OrcheConfig = {}): void {
    const logOptions: LogOptions = appConfig.logOptions || {};
    this.env = appConfig.environment || Environment.Development;

    if (logOptions.disableLog) {
      return;
    }

    if (this.log && this.transports && this.transports.length > 0) {
      this.transports.forEach((transport, index) => {
        this.log.remove(transport);
        this.transports.splice(index, 1);
      });
    }

    /**
     * Console log is enabled when:
     *  - the app is in debug mode
     *  - if consoleOptions is defined
     *  - if fileOptions was not informed and it's not production
     */
    if ((this.env !== Environment.Production) && 
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
    if ((this.env === Environment.Production) || logOptions.fileOptions) {
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
    
    let level: string;
    let humanReadable: boolean;
    let prettyPrint: boolean;
    let filename: string = PathUtils.appDirName + '-' + moment().format('YYYY-MM-DD') + '.log';
    const dirname: string = path.join(PathUtils.appRoot, 'log');

    if (this.env === Environment.Production) {
      level = 'warn';
      humanReadable = false;
      prettyPrint = false;
    } else {
      level = 'info';
      humanReadable = true;
      prettyPrint = true;
    }

    options.level = options.level || level;
    filename = options.filename || filename;
    options.dirname = options.dirname || dirname;
    options.maxsize = options.maxsize || 1000000;
    options.prettyPrint = options.prettyPrint || prettyPrint;
    options.formatter = options.formatter || this.defaultFormatter;
    options.humanReadableUnhandledException = options.humanReadableUnhandledException || 
      humanReadable;
    return options;
  }

  private defaultFormatter(options): string {
    return moment().format('YYYY-MM-DD HH:mm:sss') + ' - ' + options.level.toUpperCase() 
      + ' - ' + (options.message ? options.message : '') + 
      (options.meta && Object.keys(options.meta).length ? '\n\t' 
        + JSON.stringify(options.meta) : '');
  }

  info(msg: string, metadata?: any) {
    this.log.log('info', msg, metadata);
  }

  error(msg: string, metadata?: any) {
    this.log.log('error', msg, metadata);
  }

  warn(msg: string, metadata?: any) {
    this.log.log('warn', msg, metadata);
  }

  debug(msg: string, metadata?: any) {
    this.log.log('debug', msg, metadata);
  }

  customizeTransports(...transports: winston.TransportInstance[]): any {
    if (this.log && this.transports && this.transports.length > 0) {
      this.transports.forEach((transport, index) => {
        this.log.remove(transport);
        this.transports.splice(index, 1);
      });
    }

    this.transports = transports;
    this.log = new (winston.Logger)({ transports: this.transports });
  }
}

const logger: LogUtils = new LogUtils();
export { logger };
