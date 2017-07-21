import { HttpResponseCode } from '../constants/http-response-code';
import { Response } from './response';


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
   *
   * @return {ResponseTemplate}
   */
  toObjectLiteral(): any {
    return {
      message: this.message,
      detail: this.detail,
    };
  }
}
