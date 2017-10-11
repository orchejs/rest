/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { expect } from 'chai';
import { ErrorResponse, HttpResponseCode } from '../..';

describe('ErrorResponse', () => {
  describe('#constructor and #toJSON', () => {
    it('Should init ErrorResponse and return a JSON', () => {
      const error = new ErrorResponse(
        'error msg',
        'error details',
        HttpResponseCode.InternalServerError
      );
      const obj = error.toJSON();
      expect(obj.detail).to.be.eq('error details');
      expect(obj.message).to.be.eq('error msg');
    });
  });
});
