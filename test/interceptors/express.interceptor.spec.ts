import { expect } from 'chai';

import { OrcheResult } from '../../';
import { ServerHelper } from '../helpers/server.helper';

import { RequestHelper } from '../helpers/request.helper';

describe('ExpressInterceptor', () => {

  let serverResult: OrcheResult;
  
  before(async function () {
    this.timeout(0);
    serverResult = await ServerHelper.initBasicServer();
  });
  
  describe('#interceptorProcessor', () => {
    it('Should test all parameter types - method arguments', async () => {
      const result = await RequestHelper.delete('/orche/mocked');
      expect(result).to.be.not.null;
    });

    it('Should get an error response from interceptor', async () => {
      const result = await RequestHelper.delete('/orche/mocked/123');
      expect(result).to.be.not.null;
    });
    
    it('Should test a return from interceptor that doesnt extends Response', async () => {
      const result = await RequestHelper.delete('/orche/mocked/123/subitem');
      expect(result).to.be.not.null;
    });

    it('Should test a throw in interceptor', async () => {
      const result = await RequestHelper.delete('/orche/notfound');
      expect(result).to.be.not.null;
    });  
  });
});
