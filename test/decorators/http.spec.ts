import { nextParam } from '../../lib/decorators';
import { HttpRequestMethod } from '../../lib/constants';
import { expect } from 'chai';
import { route, get, pathParam, queryParam, interceptor, processing, requestParam } from '../../';
import { RequestHelper, ServerHelper } from '../helpers';

@interceptor('/student/:uuid', {
  httpMethods: HttpRequestMethod.Get
})
export class Admission {
  @processing()
  checkAdmission(@pathParam('uuid') uuid: number) {
    console.log('Teste');
  }
}

@route()
export class Students {
  @get(':uuid')
  getStudentId(@queryParam('name') name: string) {
    console.log('2');
  }

  @get(':uuid')
  getStudent(@pathParam('uuid') uuid: number): any {
    console.log(uuid);
  }
}

describe('HTTP Decorator tests', () => {
  before(async function() {
    this.timeout(0);
    await ServerHelper.initBasicServer();
  });

  it('Should GET student infos', async () => {
    const result = await RequestHelper.get('/orche/students/123');
    expect(result).to.be.equal('{"uuid":123,"name":"Tobias"}');
  });
});
