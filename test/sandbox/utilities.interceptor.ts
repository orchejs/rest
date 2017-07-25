import { Request, Response } from 'express';

import { interceptor, postProcessing, preProcessing, requestParam, responseParam } from '../../';

@interceptor('/orche-decorators/utilities')
class UtilitiesInterceptor {

  @preProcessing()
  public utilitiesPreProcessing(@requestParam() req: Request): void {
    req.headers['Custom-Attribute'] = 'Custom';
  }

  @postProcessing()
  public utilitiesPostProcessing(@responseParam() res: Response): void {
    res.headersSent['Custom-Attribute'] = 'Custom';
  }

}
