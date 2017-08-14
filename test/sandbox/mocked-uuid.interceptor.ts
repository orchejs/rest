import { interceptor, nextParam, processing, pathParam,
         requestParamMapper, queryParam, bodyParam, headerParam, ErrorResponse } from '../..';

@interceptor('/orche/mocked/:uuid')
class MockedUuidInterceptor {

  @processing()
  intercept(@pathParam('p1') p1,
            @queryParam('q1') q1,
            @requestParamMapper() rpm1,
            @bodyParam() body,
            @headerParam('hp1') hp1) {
    return new ErrorResponse('an error happened');
  }

}
