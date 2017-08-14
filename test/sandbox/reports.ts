import { Request, Response, NextFunction } from 'express';

import { bodyParam, get, headerParam, HttpResponseCode, nextParam,
         path, pathParam, post, queryParam, RequestMapper, requestParam,
         requestParamMapper, responseParam } from '../../';

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

  @get('custom/reports')
  getCustomReports(@requestParamMapper() reqMapper: RequestMapper): any {
    const result: any = {
      columns: reqMapper.columns,
      custom: reqMapper.custom,
      expand: reqMapper.expand,
      limit: reqMapper.limit,
      sort: reqMapper.sort,
      start: reqMapper.start };
    
    return result;
  }

  @post()
  saveReport(@bodyParam() body) {
    return {
      report: body.reportUuid };
  }
}
