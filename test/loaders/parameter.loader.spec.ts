/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { expect } from 'chai';
import { ParamType } from '../../lib/constants';
import { ParameterLoader } from '../../lib/loaders';

export class TestParameter {
  testParameterMethod(): void {}
}

describe('ParameterLoader', () => {
  describe('#addParameterConfig', () => {
    it(
      'Should add a new parameter configuration and be able to get it', 
      () => {
        const testParam = new TestParameter();
        ParameterLoader.addParameterConfig(
          testParam, 
          'testParameterMethod', 
          null, 
          1, 
          ParamType.BodyParam
        );
        const paramConfig = ParameterLoader.getParameterConfig(
          'TestParameter', 
          'testParameterMethod'
        );
        expect(paramConfig).to.be.not.undefined;
      });
  });
});
