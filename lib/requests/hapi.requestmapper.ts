import { Request } from 'hapi';
import { RequestMapper } from './requestmapper';

export class HapiRequestMapper extends RequestMapper {

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