/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { Router } from './';
import { ContentType, CorsConfig, ParamUnit } from '../interfaces';
import { ValidatorError } from '@orchejs/validators';
import { HttpRequestMethod } from '../constants';

export class KoaRouter extends Router {
  constructor(app: any) {
    super(app);
  }

  protected createRouter() {
    throw new Error('Method not implemented.');
  }

  protected addRouterToApp(appPath: string, routerPath: string, router: any): void {
    throw new Error('Method not implemented.');
  }

  protected addRoute(
    router: any,
    path: string,
    corsConfig: CorsConfig,
    middlewares: any[],
    httpMethod: HttpRequestMethod
  ): void {
    throw new Error('Method not implemented.');
  }

  protected routeExecution(
    target: string,
    method: Function,
    methodName: string,
    contentType: ContentType
  ): Function {
    throw new Error('Method not implemented.');
  }

  protected getParamValue(
    param: ParamUnit,
    args: any
  ): Promise<{ validatorErrors: ValidatorError[]; value: any }> {
    throw new Error('Method not implemented.');
  }
}
