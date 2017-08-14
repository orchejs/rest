import { interceptor, processing, ErrorResponse, HttpResponseCode } from '../..';

@interceptor('/orche/notfound')
class NotFoundInterceptor {

  @processing()
  interceptor() {
    throw new Error('not found');
  }

}
