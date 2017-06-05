import { Request } from 'restify';
import { RequestMapper } from './requestmapper';

export class RestifyRequestMapper extends RequestMapper {

  constructor(request: Request) {
    super(request);
  }

  protected loadPathParams(request: Request): void {
    throw new Error("Method not implemented.");
  }

  protected loadQueryParams(request: Request): void {
    throw new Error("Method not implemented.");
  }
}