/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { UrlUtils } from '@orchejs/common';
import { Request } from 'restify';
import { RequestMapper } from './request-mapper';

export class RestifyRequestMapper extends RequestMapper {
  constructor(request: Request) {
    super(request);
  }

  protected loadPathParams(request: Request): void {
    const params = request.params;
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        this.pathParams[key] = params[key];
      }
    }
  }

  protected loadQueryParams(request: Request): void {
    const params = request.query;
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const paramValue: any = params[key];
        this[key] = UrlUtils.getPathValue(paramValue);
      }
    }
  }
}
