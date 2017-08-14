import { interceptor, nextParam, processing, pathParam,
         requestParamMapper, queryParam, bodyParam, headerParam, ErrorResponse } from '../..';

@interceptor('/orche/mocked/:uuid')
class MockedUuidInterceptor {

  @processing()
  intercept() {
    return new ErrorResponse('an error happened');
  }

}
