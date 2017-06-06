import { HttpResponseCode } from '../constants/httpresponsecode';
import { MimeType } from '../constants/mimetype';


export abstract class GenericResponse {

  protected contentType: MimeType;
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
  constructor(contentType?: MimeType, httpStatus?: HttpResponseCode) {
    this.contentType = contentType || MimeType.json;

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
   * Response's content type.
   * The content-type that will be set to the header is the one passed during
   * the creation of this object. If none was informed, then the default will be
   * application/json.
   *
   * @returns string
   */
  getContentType(): string {
    return this.contentType.toString();
  }

  /**
   * Return the response as a Object Literal, having the main fields.
   *
   * @return {ResponseTemplate}
   */
  abstract toObjectLiteral(): any;

}
