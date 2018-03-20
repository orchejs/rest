/**
 * @license
 * Copyright Mauricio Gemelli Vigolo and contributors.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { HttpRequestMethod } from '../../lib/constants/index';
import {
  interceptor,
  process,
  responseParam,
  headerParam,
  ErrorResponse,
  HttpResponseCode,
  route,
  get,
  del,
  pathParam
} from '../..';
import { Response } from 'express';
import { expect } from 'chai';
import { RequestHelper, ServerHelper } from '../helpers';
import { PathUtils } from '@orchejs/common';

@interceptor('musics/:uuid', {
  order: 0,
  httpMethods: [HttpRequestMethod.Delete]
})
export class AvoidDeletion {
  @process()
  execute(@responseParam() res: Response): any {
    return new ErrorResponse('Delete is Forbidden', undefined, HttpResponseCode.Forbidden);
  }
}

@interceptor('musics/:uuid')
export class AuthenticatorInterceptor {
  @process()
  execute(@headerParam('authentication') token: string, @responseParam() res: Response): any {
    if (!token) {
      res.status(HttpResponseCode.Forbidden).send({ message: 'Session Expired' });
    }
  }
}

@interceptor()
export class NopInterceptor {
  @process()
  execute() {
    // Do nothing!
  }
}

@route('musics')
export class MusicRs {
  @get(':uuid')
  getMusic(@pathParam(':uuid') uuid: string) {
    return { uuid, name: 'Music 1' };
  }

  @del(':uuid')
  deleteMusic(@pathParam(':uuid') uuid: string) {
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
