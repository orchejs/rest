import { PathUtils } from '../utils/path.utils';
import { Request } from 'express';
import { RequestMapper } from './request-mapper';

export class ExpressRequestMapper extends RequestMapper {
  constructor(request: Request) {
    super(request);
  }

  protected loadPathParams(request: Request): void {
    const params = request.params;

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        this.pathParams[key] = params[key];
      }
    }
  }

  protected loadQueryParams(request: Request): void {
    const params = request.query;

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const paramValue: any = params[key];
        this[key] = PathUtils.getPathValue(paramValue);
      }
    }
  }
}
