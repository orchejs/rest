import { NextFunction } from 'express';

import { interceptor, nextParam, processing, pathParam,
         requestParamMapper, queryParam, bodyParam, headerParam } from '../..';

@interceptor('/orche/mocked')
class MockedInterceptor {

  @processing()
  intercept(@nextParam() next: NextFunction,
            @pathParam('p1') p1,
            @queryParam('p2') p2,
            @requestParamMapper() rpm,
            @bodyParam() body,
            @headerParam('p3') p3): void {
    next();
  }

}
