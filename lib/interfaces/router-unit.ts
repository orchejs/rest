/**
 * @license
 * Copyright Mauricio Gemelli Vigolo and contributors.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { CorsOptions } from './cors-options';
import { HttpRequestMethod } from '../constants/http-request-method';
import { ContentType } from '../interfaces/content-type';
import { CorsConfig } from '../interfaces/cors-config';

export interface RouterUnit {
  path?: string;
  methodName?: string;
  method?: any;
  httpMethod?: HttpRequestMethod;
  contentType?: ContentType;
  cors?: CorsConfig;
  middlewares?: Function[];
}
