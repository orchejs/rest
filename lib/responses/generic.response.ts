import { ContentType } from '../interfaces/content-type';
import { Response } from './response';
import { HttpResponseCode } from '../constants/http-response-code';
import { MimeType } from '../constants/mimetype';


export class GenericResponse extends Response {

  protected data: any;
  protected contentType: MimeType;

  constructor(data?: any, contentType?: MimeType, httpStatus?: HttpResponseCode) {
    super(httpStatus);

    if (!contentType) {
      this.contentType = MimeType.json;
    } else {
      this.contentType = contentType;
    }

    this.data = data;
  }

  toObjectLiteral() {
    return {
      
    };
  }

}
