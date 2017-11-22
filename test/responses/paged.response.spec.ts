/**
 * @license
 * Copyright Mauricio Gemelli Vigolo.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { expect } from 'chai';
import { PagedResponse, HttpResponseCode } from '../..';

describe('PagedResponse', () => {
  describe('#constructor and #toJSON', () => {
    it('Should create a PagedResponse and return a JSON object', () => {
      const res = new PagedResponse([{ uuid: '1' }, { uuid: '2' }], 10, 0, 2);
      const obj = res.toJSON();
      expect(obj.size).to.be.eq(10);
      expect(obj.page).to.be.eq(0);
      expect(obj.totalElements).to.be.eq(2);
    });

    it('Should create a PagedResponse and the JSON object size and total eq 0', () => {
      const res = new PagedResponse([{ uuid: '1' }, { uuid: '2' }], 0, 0, 0);
      const obj = res.toJSON();
      expect(obj.size).to.be.eq(0);
      expect(obj.page).to.be.eq(0);
      expect(obj.totalElements).to.be.eq(0);
    });
  });
});
