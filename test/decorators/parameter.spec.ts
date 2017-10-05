/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { expect } from 'chai';
import { Request, Response } from 'express';
import { RequestHelper } from '../helpers';
import {
  Route,
  All,
  Get,
  Post,
  Put,
  Delete,
  RequestParam,
  ResponseParam,
  QueryParam,
  PathParam,
  RequestParamMapper,
  BodyParam,
  HeaderParam,
  GenericResponse,
  HttpResponseCode
} from '../..';

export class Computer {
  private uuid: string;
  private model: string;

  constructor(uuid: string, model:string) {
    this.uuid = uuid;
    this.model = model;
  }
}

@Route('computers')
export class ComputersRs {
  @All('*')
  checkAccess(@RequestParam() req: Request) {
    const token: string = req.headers['authentication'];
    req.headers['bearer'] = token;
  }

  @Get(':uuid')
  read(@PathParam('uuid') uuid: string, @HeaderParam('bearer') token: string) {
    return new GenericResponse({ uuid, token }, HttpResponseCode.Ok);
  }

  @Get()
  list(@QueryParam('name') name: string, @QueryParam('size') size: number): GenericResponse {
    return new GenericResponse({ name, size }, HttpResponseCode.Ok);
  }

}

describe('Parameter decorators tests', () => {
  it('Should get value from QueryParam and return it', async () => {
    const response = await RequestHelper.get('/orche/computers?name=stu&size=10');
    expect(response.name).to.be.equal('stu');
    expect(response.size).to.be.equal(10);
  });  

  it('Should get value from RequestParam set it in Response using ResponseParam', async () => {
    const response = await RequestHelper.get(
      '/orche/computers/1234', 
      undefined, 
      undefined, 
      undefined, 
      undefined, 
      { 
        authentication: '1234567' 
      }
    );
    expect(response.token).to.be.equal('1234567');
  });
});
