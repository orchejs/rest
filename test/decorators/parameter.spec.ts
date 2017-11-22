/**
 * @license
 * Copyright Mauricio Gemelli Vigolo.
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
  ExpressRequestMapper,
  BodyParam,
  HeaderParam,
  GenericResponse,
  HttpResponseCode
} from '../..';

export class Computer {
  private uuid: string;
  private model: string;

  constructor(uuid: string, model: string) {
    this.uuid = uuid;
    this.model = model;
  }
}

@Route('computers')
export class ComputersRs {
  @All('*')
  checkAccess(@RequestParam() req: Request) {
    const token: string | string[] = req.headers['authentication'];
    req.query['bearer'] = token;
  }

  @Get(':uuid')
  read(@PathParam('uuid') uuid: number, @RequestParamMapper() mapper: ExpressRequestMapper) {
    return new GenericResponse({ uuid, bearer: mapper.bearer }, HttpResponseCode.Ok);
  }

  @Get()
  list(@QueryParam('name') name: string, @QueryParam('size') size: number): GenericResponse {
    return new GenericResponse({ name, size }, HttpResponseCode.Ok);
  }

  @Post()
  create(@BodyParam() computer: Computer, @ResponseParam() res: Response) {
    res.status(HttpResponseCode.Created).send(computer);
  }
}

describe('Parameter decorators tests', () => {
  it('Should get value from QueryParam and return it', async () => {
    const response = await RequestHelper.get('/orche/computers?name=stu&size=10');
    expect(response.name).to.be.equal('stu');
    expect(response.size).to.be.equal(10);
  });

  it(`Should get token - bearer from Request and set bearer as query param in RequestParamMapper`, async () => {
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
    expect(response.bearer).to.be.equal('1234567');
  });

  it('Should get value from PathParam and return it', async () => {
    const response = await RequestHelper.get('/orche/computers/123');
    expect(response.uuid).to.be.equal(123);
  });

  it('Should load computer object in BodyParam and return it using the ResponseParam', async () => {
    const response = await RequestHelper.post('/orche/computers', {
      uuid: '123',
      model: 'Intel Core i5, SSD 500GB, 8 RAM'
    });
    expect(response.uuid).to.be.equal('123');
    expect(response.model).to.be.equal('Intel Core i5, SSD 500GB, 8 RAM');
  });
});
