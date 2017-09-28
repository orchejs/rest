/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { Response } from './';
import { HttpResponseCode } from '../constants';

export class ErrorResponse extends Response {
  protected message?: string;
  protected detail?: any;

  constructor(message?: string, detail?: any, httpStatus?: HttpResponseCode) {
    super(httpStatus);
    this.message = message;
    this.detail = detail;
  }

  /**
   * Return the response as a Object Literal, having the main fields.
   * @return {ResponseTemplate}
   */
  toObjectLiteral(): any {
    return {
      message: this.message,
      detail: this.detail
    };
  }
}
