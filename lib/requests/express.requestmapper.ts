import { PathUtils } from '../utils/path.utils';
import { Request } from 'express';
import { RequestMapper } from './requestmapper';

export class ExpressRequestMapper extends RequestMapper {

  constructor(request: Request) {
    super(request);
  }

  protected loadPathParams(request: Request): void {
    const params = request.params;

    if (!params) {
      return;
    }

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        this.pathParams[key] = params[key];
      }
    }
  }

  protected loadQueryParams(request: Request): void {
    const params = request.query;

    if (!params) {
      return;
    }

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const paramValue: any = params[key];
        if (paramValue) {
          this[key] = PathUtils.getPathValue(paramValue);
        }
      }
    }
  }
  
}
