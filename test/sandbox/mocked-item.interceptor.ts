import { interceptor, nextParam, processing, pathParam,
  requestParamMapper, queryParam, bodyParam, headerParam, ErrorResponse } from '../..';

@interceptor('/orche/mocked/:uuid/subitem')
class MockedItemInterceptor {

  @processing()
  intercept() {
    return { item: 'subitem' };
  }

}
