/**
 * @license
 * Copyright Mauricio Gemelli Vigolo and contributors.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { InterceptorConfig, InterceptorUnit } from '../interfaces';
import { HttpRequestMethod } from '../constants/http-request-method';

export class InterceptorLoader {
  static interceptorConfigs: InterceptorConfig[] = [];
  static interceptorUnit: InterceptorUnit;

  static addInterceptorConfig(
    path?: string,
    order: number = this.interceptorConfigs.length + 1,
    className?: string,
    httpMethods?: HttpRequestMethod[]
  ) {
    const interceptorPath: string = path || '/*';
    const interceptorOrder: number = order || this.interceptorConfigs.length + 1;
    const interceptorClassName: string = className || '';
    const interceptorHttpMethods: HttpRequestMethod[] = httpMethods || [];

    let interceptorConfig: InterceptorConfig;

    interceptorConfig = {
      path: interceptorPath,
      order: interceptorOrder,
      className: interceptorClassName,
      httpMethods: interceptorHttpMethods,
      interceptorUnit: this.interceptorUnit
    };

    this.interceptorConfigs.push(interceptorConfig);
    this.interceptorConfigs.sort((a, b) => a.order - b.order);
  }

  static addInterceptorUnit(method: any, methodName: string) {
    const interceptorUnit: InterceptorUnit = {
      method,
      methodName
    };

    this.interceptorUnit = interceptorUnit;
  }
}
