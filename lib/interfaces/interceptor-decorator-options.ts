/**
 * @license
 * Copyright Mauricio Gemelli Vigolo and contributors.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { HttpRequestMethod } from '../constants/http-request-method';

export interface InterceptorDecoratorOptions {
  httpMethods?: HttpRequestMethod | HttpRequestMethod[];
  order?: number;
}
