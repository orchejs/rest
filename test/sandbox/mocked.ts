import { all, patch, post, head, put, get, del, ErrorResponse, path, pathParam, 
         HttpDecoratorOptions } from '../..';

@path('/mocked')
class Mocked {

  @get(
      ':uuid', { 
        cors: {
          preflight: true,
          corsOptions: { },
        },
      },
    )
  getMocked(@pathParam('uuid') uuid) {
    return uuid;
  }

  @get(':uuid/subitem')
  getMockedSubItem(@pathParam('uuid') uuid) {
    return uuid;
  }

  @post(null, {
    cors: {
      corsOptions: {},
    },
  })
  postMocked() {
    return null;
  }

  @put(null, {
    cors: {
      corsOptions: {},
    },
  })  
  putMocked() {
    return null;
  }

  @patch(null, {
    cors: {
      corsOptions: {},
    },
  })  
  patchMocked() {
    return null;
  }

  @head(null, {
    cors: {
      corsOptions: {},
    },
  })  
  headMocked() {
    return null;
  }

  @all(null, {
    cors: {
      corsOptions: {},
    },
  })  
  allMocked() {
    return null;
  }

  @del(null, {
    cors: {
      corsOptions: {
      },
    },
  })
  removeMocked() {
    const result: ErrorResponse = new ErrorResponse('Resource identifier not informed');
    return result;
  }
}
