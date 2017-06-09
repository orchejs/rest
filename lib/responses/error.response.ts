import { HttpResponseCode } from '../constants/http-response-code';
import { MimeType } from '../constants/mimetype';
import { GenericResponse } from './generic.response';


export class ErrorResponse extends GenericResponse {

  protected message?: string;
  protected detail?: any;


  constructor(message?: string, detail?: any, contentType?: MimeType, 
              httpStatus?: HttpResponseCode) {
    super(contentType, httpStatus);

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
      data: this.message,
      detail: this.detail,
    };
  }
}
