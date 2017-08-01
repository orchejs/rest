import { Request, Response } from 'express';

import { interceptor, processing, requestParam, responseParam,
         HttpRequestMethod } from '../../';

@interceptor(['/orche/restricted'], [HttpRequestMethod.Post], 0)
class SecurityArrayInterceptor {

  @processing()
  public preProcessing(@requestParam() req: Request): void {
    req.headers['Authorization'] = 'custom-token';
  }

}
