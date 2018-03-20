/**
 * @license
 * Copyright Mauricio Gemelli Vigolo and contributors.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { HttpResponseCode } from '../constants/http-response-code';
import { MimeType } from '../constants/mimetype';

export abstract class Response {
  readonly isResponseType: boolean = true;
  protected httpStatus: HttpResponseCode;

  /**
   * Most basic response type.
   * The default http status is OK (200), if not will be INTERNAL_SERVER_ERROR (500).
   *
   * @param {any} [contentType]
   * content type for the response.
   * @param {HttpResponseCode} [httpStatus]
   * response http status.
   */
  constructor(httpStatus?: HttpResponseCode) {
    if (!httpStatus) {
      this.httpStatus = HttpResponseCode.Ok;
    } else {
      this.httpStatus = httpStatus;
    }
  }

  /**
   * Returns the HTTP status code.
   *
   * @return {number}
   */
  getHttpStatus(): number {
    return this.httpStatus;
  }

  /**
   * Return the response as a Object Literal, having the main fields.
   *
   * @return {ResponseTemplate}
   */
  abstract toJSON(): any;
}
