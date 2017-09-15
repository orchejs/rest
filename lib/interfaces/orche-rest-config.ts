import { Environment } from '../constants/environment';
import { CorsOptions } from './cors-options';
import { OrcheEngine } from '../constants/orche-engine';
import { LogOptions } from './log-options';

export interface OrcheRestConfig {
  /**
   * Choose an API Engine. Orche currently supports:
   * - expressjs
   * - hapi
   * - restify
   * - koa
   * 
   * Why choose an api engine? I also struggle with the same question, however it's interesting 
   * to be able to choose a different engine for these reasons:
   * - performance
   * - non resolved issues in a specific framework
   * - in this way, changing the api engine is a peace of cake :D
   */
  apiEngine?: OrcheEngine;
  /**
   * The app name. It serves for config resolution.
   * Default value: module name
   */
  appName?: string;
  /**
   * Root path for the API.
   * Default value: /
   */
  path?: string;
  /**
   * The port that the application will be served.
   *
   * Default value: 3000
   */
  port?: number;
  /**
   * 
   */
  middlewares?: any[];
  /**
   * Engine settings.
   */
  settings?: any;
  /**
   * Default value: undefined
   */
  corsConfig?: CorsOptions;
  /**
   * If true the orche library will output some values like loaded path's.
   *
   * Default value: false
   */
  debug?: boolean;
  /**
   * 
   */
  environment?: Environment;
  /**
   * 
   */
  logOptions?: LogOptions;
  /**
   * TODO: Add monitor api to the project to get some statistics about the usage.
   */
  // monitorRequests?: boolean;
}