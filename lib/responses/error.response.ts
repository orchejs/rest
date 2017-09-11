import { HttpResponseCode } from '../constants/http-response-code';
import { GenericResponse } from './generic.response';

export class ErrorResponse extends GenericResponse {
  protected message?: string;
  protected detail?: any;

  constructor(message?: string, detail?: any, httpStatus?: HttpResponseCode) {
    super(httpStatus);

    this.message = message;
    this.detail = detail;
  }

  /**
   * Return the response as a Object Literal, having the main fields.
   *
   * @return {ResponseTemplate}
   */
  toObjectLiteral(): any {
    return {
      message: this.message,
      detail: this.detail
    };
  }
}
