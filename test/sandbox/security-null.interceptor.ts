import { Request, Response } from 'express';

import { interceptor, postProcessing, preProcessing, requestParam, responseParam,
         HttpRequestMethod } from '../../';

@interceptor(null, null)
class SecurityNullInterceptor {

  @preProcessing()
  public preProcessing(@requestParam() req: Request): void {
    req.headers['Authorization'] = 'custom-token';
  }

  @postProcessing()
  public postProcessing(@responseParam() res: Response): void {
    res.setHeader['Custom-Header'] = 'Response Custom Header';
  }

}
