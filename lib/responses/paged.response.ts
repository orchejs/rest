/**
 * @license
 * Copyright Mauricio Gemelli Vigolo and contributors.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { GenericResponse } from '../responses/generic.response';
import { HttpResponseCode } from '../constants/http-response-code';
import { MimeType } from '../constants/mimetype';

export class PagedResponse extends GenericResponse {
  protected size: number;
  protected page: number;
  protected totalElements: number;
  protected totalPages?: number;

  constructor(
    data: any,
    size: number,
    page: number,
    totalElements: number,
    httpStatus?: HttpResponseCode
  ) {
    super(data, httpStatus);

    this.size = size;
    this.page = page;
    this.totalElements = totalElements;

    if (totalElements > 0 && size > 0) {
      this.totalElements = totalElements;
      this.totalPages = Math.ceil(totalElements / size);
    }
  }

  /**
   * Return the response as a Object Literal, having the main fields.
   *
   * @return {ResponseTemplate}
   */
  toJSON(): any {
    return {
      data: this.data,
      size: this.size,
      page: this.page,
      totalElements: this.totalElements,
      totalPages: this.totalPages
    };
  }
}
