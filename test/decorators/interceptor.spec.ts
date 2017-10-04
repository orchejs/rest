import { 
  Interceptor, 
  Process, 
  ResponseParam, 
  HeaderParam, 
  ErrorResponse, 
  HttpResponseCode,
  Route,
  Get
} from '../..';
import { Response } from 'express';
import { expect } from 'chai';
import { RequestHelper, ServerHelper } from '../helpers';
import { PathUtils } from '@orchejs/common';

@Interceptor('musics/*')
export class AuthenticatorInterceptor {
  @Process()
  execute(@HeaderParam('authentication') token: string, @ResponseParam() res: Response): any {
    if (!token) {
      return new ErrorResponse('Forbidden', undefined, HttpResponseCode.Forbidden);
    }
  }
}

@Route('musics')
export class MusicRs {
  @Get(':uuid')
  getMusic() {
    return { uuid: 123, name: 'Music 1' };
  }
}

describe('Interceptor decorator tests', () => {

  before(async function() {
    this.timeout(0);
    await ServerHelper.initBasicServer();
  });

  it('Should intercept requests to /orche/musics and cancel the request', async () => {
    const result = await RequestHelper.get('/orche/musics/123');
    expect(result.message).to.be.equal('Forbidden');
  });
});
