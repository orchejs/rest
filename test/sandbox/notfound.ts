import { get, ErrorResponse, path, HttpResponseCode } from '../..';

@path('/notfound')
class Mocked {

  @get()
  getMocked() {
    return new ErrorResponse('not found', null, HttpResponseCode.NotFound);
  }
  
}
