/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { expect } from 'chai';
import { GenericResponse, HttpResponseCode } from '../..';

describe('GenericResponse', () => {
  describe('#constructor', () => {
    it('Should create a GenericResponse with default values - data undefined', () => {
      const res = new GenericResponse();
      const obj = res.toJSON();
      expect(obj).to.be.undefined;
    });
  });
});
