import { all, patch, post, head, put, get, del, ErrorResponse, path, pathParam } from '../..';

@path('/mocked')
class Mocked {

  @get(':uuid', null, {
    preflight: true,
    corsOptions: {
    },
  })
  getMocked(@pathParam('uuid') uuid) {
    return uuid;
  }

  @get(':uuid/subitem')
  getMockedSubItem(@pathParam('uuid') uuid) {
    return uuid;
  }

  @post(null, null, {
    corsOptions: {},
  })
  postMocked() {
    return null;
  }

  @put(null, null, {
    corsOptions: {},
  })  
  putMocked() {
    return null;
  }

  @patch(null, null, {
    corsOptions: {},
  })  
  patchMocked() {
    return null;
  }

  @head(null, null, {
    corsOptions: {},
  })  
  headMocked() {
    return null;
  }

  @all(null, null, {
    corsOptions: {},
  })  
  allMocked() {
    return null;
  }

  @del(null, null, {
    corsOptions: {
    },
  })
  removeMocked() {
    const result: ErrorResponse = new ErrorResponse('Resource identifier not informed');
    return result;
  }
}
