/**
 * @license
 * Copyright Mauricio Gemelli Vigolo and contributors.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { Environment, LogOptions } from '@orchejs/common';
import { CorsOptions } from './';
import { OrcheEngine } from '../constants';

/**
 * @description
 * Orche REST initialization config options.
 */
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
   * Default value: 3000
   */
  port?: number;
  /**
   * Extensions / middlewares to be added to the application.
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
   * Default value: false
   */
  debug?: boolean;
  /**
   * Setting the environment. Default value is development.
   * To get better results and performance, don't forget to set this
   * value to production mode, when deploying to production.
   */
  environment?: Environment;
  /**
   * Options to load the application log. The default log is console.
   */
  logOptions?: LogOptions;
  /**
   * This is the directory that the server will look for router decorators.
   * The default value is the app root directory.
   */
  baseDir?: string;
  /**
   * TODO: Add monitor api to the project to get usage statistics.
   */
  // monitorRequests?: boolean;
}
