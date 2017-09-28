/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
export abstract class RequestMapper {
  [queryParams: string]: any;

  constructor(request: any) {
    this.pathParams = {};
    this.loadPathParams(request);
    this.loadQueryParams(request);
  }

  protected abstract loadPathParams(request: any): void;

  protected abstract loadQueryParams(request: any): void;
}
