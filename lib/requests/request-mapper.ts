/**
 * @license
 * Copyright Mauricio Gemelli Vigolo.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
export abstract class RequestMapper {
  [params: string]: any;

  constructor(request: any) {
    this.loadPathParams(request);
    this.loadQueryParams(request);
  }

  protected abstract loadPathParams(request: any): void;
  protected abstract loadQueryParams(request: any): void;
}
