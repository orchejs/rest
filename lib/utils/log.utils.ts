import * as winston from 'winston';
import * as moment from 'moment';
import * as path from 'path';
import * as fs from 'fs';

import { Environment } from '../constants/environment';
import { LogOptions } from '../interfaces/log-options';
import { OrcheConfig } from '../interfaces/orche-config';
import { PathUtils } from './path.utils';

export class LogUtils {

  private instance: any;
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

    if (this.instance && this.transports && this.transports.length > 0) {
      this.transports.forEach((transport, index) => {
        this.instance.remove(transport);
        this.transports.splice(index, 1);
      });
    }

    /**
     * Console log is enabled when:
     *  - the app is in debug mode
     *  - if consoleOptions is defined
     *  - if fileOptions was not informed and it's not production
     */
    if ((this.env !== Environment.Production || appConfig.debug) && 
        (appConfig.debug || logOptions.consoleOptions || !logOptions.fileOptions)) {
      logOptions.consoleOptions = this.loadConsoleOptions(logOptions.consoleOptions);
      const consoleTransport = new (winston.transports.Console)(logOptions.consoleOptions);
      consoleTransport.setMaxListeners(0);
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

    this.instance = new (winston.Logger)({ 
      transports: this.transports,
    });
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
    const filename: string = PathUtils.appDirName + '-' + moment().format('YYYY-MM-DD') + '.log';
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
    options.filename = options.filename || filename;
    options.dirname = options.dirname || dirname;

    try {
      if (!fs.existsSync(options.dirname)) {
        fs.mkdirSync(options.dirname);
      }
    } catch (e) {
      const msg =  `An error happened while trying to access/create the directory 
      for the log. Do you have permission to access?. Details: ${e}`;
      throw new Error(msg);
    }

    options.maxsize = options.maxsize || 1000000;
    options.json = options.json || false;
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
    this.instance.log('info', msg, metadata);
  }

  error(msg: string, metadata?: any) {
    this.instance.log('error', msg, metadata);
  }

  warn(msg: string, metadata?: any) {
    this.instance.log('warn', msg, metadata);
  }

  debug(msg: string, metadata?: any) {
    this.instance.log('debug', msg, metadata);
  }

  customizeTransports(...transports: winston.TransportInstance[]): any {
    if (this.instance && this.transports && this.transports.length > 0) {
      this.transports.forEach((transport, index) => {
        this.instance.remove(transport);
        this.transports.splice(index, 1);
      });
    }

    this.transports = transports;
    this.instance = new (winston.Logger)({ transports: this.transports });
  }
}

const logger: LogUtils = new LogUtils();
export { logger };
