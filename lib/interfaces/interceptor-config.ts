/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { InterceptorUnit } from './';
import { HttpRequestMethod } from '../constants';

export interface InterceptorConfig {
  path: string;
  order?: number;
  className?: string;
  httpMethods?: HttpRequestMethod[];
  interceptorUnit?: InterceptorUnit;
}
