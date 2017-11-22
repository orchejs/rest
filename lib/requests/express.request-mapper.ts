/**
 * @license
 * Copyright Mauricio Gemelli Vigolo.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { UrlUtils } from '@orchejs/common';
import { Request } from 'express';
import { RequestMapper } from './request-mapper';

export class ExpressRequestMapper extends RequestMapper {
  constructor(request: Request) {
    super(request);
  }

  protected loadPathParams(request: Request): void {
    const params = request.params;
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        this[key] = params[key];
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
