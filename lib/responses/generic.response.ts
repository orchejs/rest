/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { Response } from './response';
import { HttpResponseCode } from '../constants/http-response-code';

export class GenericResponse extends Response {
  protected data: any;

  constructor(data?: any, httpStatus?: HttpResponseCode) {
    super(httpStatus);
    this.data = data;
  }

  public toObjectLiteral(): any {
    return this.data;
  }
}
