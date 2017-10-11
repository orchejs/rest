/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { HttpRequestMethod } from '../../lib/constants/index';
import { 
  Interceptor, 
  Process, 
  ResponseParam, 
  HeaderParam, 
  ErrorResponse, 
  HttpResponseCode,
  Route,
  Get,
  Delete,
  PathParam
} from '../..';
import { Response } from 'express';
import { expect } from 'chai';
import { RequestHelper, ServerHelper } from '../helpers';
import { PathUtils } from '@orchejs/common';

@Interceptor('musics/:uuid', {
  order: 0,
  httpMethods: [
    HttpRequestMethod.Delete
  ]
})
export class AvoidDeletion {
  @Process()
  execute(@ResponseParam() res: Response): any {
    return new ErrorResponse('Delete is Forbidden', undefined, HttpResponseCode.Forbidden);
  }
}

@Interceptor('musics/:uuid')
export class AuthenticatorInterceptor {
  @Process()
  execute(@HeaderParam('authentication') token: string, @ResponseParam() res: Response): any {
    if (!token) {
      res.status(HttpResponseCode.Forbidden).send({ message: 'Session Expired' });
    }
  }
}

@Interceptor()
export class NopInterceptor {
  @Process()
  execute() {
    // Do nothing!
  }
}

@Route('musics')
export class MusicRs {
  @Get(':uuid')
  getMusic(@PathParam(':uuid') uuid: string) {
    return { uuid, name: 'Music 1' };
  }

  @Delete(':uuid')
  deleteMusic(@PathParam(':uuid') uuid: string) {
    return { uuid };
  }
}

describe('Interceptor decorator tests', () => {
  it('Should intercept requests to /orche/musics/:uuid and cancel the request', async () => {
    const result = await RequestHelper.get('/orche/musics/123');
    expect(result.message).to.be.equal('Session Expired');
  });

  it('Should intercept requests to /orche/musics/:uuid and avoid deletion', async () => {
    const result = await RequestHelper.delete('/orche/musics/123');
    expect(result.message).to.be.equal('Delete is Forbidden');
  });  
});
