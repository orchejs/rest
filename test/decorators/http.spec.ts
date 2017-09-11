import { setTimeout } from 'timers';
import { expect } from 'chai';
import { route, get, pathParam } from '../../';
import { RequestHelper, ServerHelper } from '../helpers';

@route()
class Students {
  @get(':uuid')
  getStudent(@pathParam('uuid') uuid): any {
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
