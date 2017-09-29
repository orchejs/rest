/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { ClassUtils } from '@orchejs/common';
import { InterceptorDecoratorOptions } from '../interfaces';
import { InterceptorLoader } from '../loaders';
import { HttpRequestMethod } from '../constants';

export function Interceptor(
  path: string = '/',
  options: InterceptorDecoratorOptions = { httpMethods: HttpRequestMethod.All }
) {
  return function(target: any) {
    const className = ClassUtils.getClassName(target);

    let httpMethodsArr: HttpRequestMethod[] = [];
    if (!Array.isArray(options.httpMethods)) {
      httpMethodsArr.push(options.httpMethods);
    } else {
      httpMethodsArr = options.httpMethods;
    }
    InterceptorLoader.addInterceptorConfig(path, options.order, className, httpMethodsArr);
  };
}

export function Processing() {
  return function(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    InterceptorLoader.addInterceptorUnit(descriptor.value.bind(target), propertyKey);
  };
}
