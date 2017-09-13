import { expect } from 'chai';
import { route, get, pathParam, queryParam } from '../../';
import { RequestHelper, ServerHelper } from '../helpers';

@route()
export class Students {
  @get(':uuid')
  getStudent(@pathParam('uuid') uuid: number): any {
    return { uuid, name: 'Tobias' };
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
