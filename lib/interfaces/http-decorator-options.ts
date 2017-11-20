/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { CorsConfig } from './cors-config';
import { ContentType } from './content-type';

export interface HttpDecoratorOptions {
  contentType?: ContentType;
  cors?: CorsConfig;
  middlewares?: Function[];
}
