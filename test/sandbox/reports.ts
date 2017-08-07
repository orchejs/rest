import { Request, Response, NextFunction } from 'express';

import {
  path, get, post, headerParam, requestParam, nextParam,
  pathParam, queryParam, responseParam, HttpResponseCode,
  requestParamMapper, RequestMapper
} from '../../';

@path('reports')
class Reports {

  @get()
  goToNextMethod(@requestParam() request: Request, @nextParam() next: NextFunction) {
    request.query['calledNext'] = true;
    next();
  }

  @get()
  getReports(@queryParam('calledNext') calledNext, @responseParam() response: Response) {
    response.status(HttpResponseCode.Ok).send({ calledNext });
  }

  @get(':uuid')
  getReport(@pathParam('uuid') uuid) {
    const report = { uuid };
    return report;
  }

  @get('custom')
  getCustomReports(@requestParamMapper() reqMapper: RequestMapper) {
    const result: any = {
      columns: reqMapper.columns,
      custom: reqMapper.custom,
      expand: reqMapper.expand,
      limit: reqMapper.limit,
      sort: reqMapper.sort,
      start: reqMapper.start };
    
    return result;
  }
}
