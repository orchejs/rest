import { Request, Response } from 'express';

import { interceptor, postProcessing, preProcessing, requestParam, responseParam,
         HttpRequestMethod } from '../../';

@interceptor(['/orche/restricted'], [HttpRequestMethod.Post])
class SecurityNdInterceptor {

  @preProcessing()
  public preProcessing(@requestParam() req: Request): void {
    req.headers['Authorization'] = 'custom-token';
  }

  @postProcessing()
  public postProcessing(@responseParam() res: Response): void {
    console.log(res);
  }

}
