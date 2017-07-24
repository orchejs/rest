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
