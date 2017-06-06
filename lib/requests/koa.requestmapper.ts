import { Request } from 'koa';
import { RequestMapper } from './requestmapper';

export class KoasRequestMapper extends RequestMapper {

  constructor(request: Request) {
    super(request);
  }

  protected loadPathParams(request: Request): void {

  }

  protected loadQueryParams(request: Request): void {

  }
}
