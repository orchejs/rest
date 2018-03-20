/**
 * @license
 * Copyright Mauricio Gemelli Vigolo and contributors.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { expect } from 'chai';
import { Request } from 'express';
import { ExpressRequestMapper } from '../..';

describe('ExpressRequestMapper', () => {
  describe('#loadPathParams and #loadQueryParams', () => {
    it('Should initialize all path and query params from express.Request', () => {
      const req: Request = {} as Request;
      req.params = { uuid: '123' };
      req.query = { size: '10' };
      const erm = new ExpressRequestMapper(req);
      expect(erm.size).to.be.eq('10');
      expect(erm.uuid).to.be.eq('123');
    });
  });
});
