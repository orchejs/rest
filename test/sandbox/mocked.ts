import { get, del, ErrorResponse, path, pathParam } from '../..';

@path('/mocked')
class Mocked {

  @get(':uuid')
  getMocked(@pathParam('uuid') uuid) {
    return uuid;
  }

  @get(':uuid/subitem')
  getMockedSubItem(@pathParam('uuid') uuid) {
    return uuid;
  }

  @del()
  removeMocked() {
    const result: ErrorResponse = new ErrorResponse('Resource identifier not informed');
    return result;
  }
}
