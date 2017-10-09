/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { expect } from 'chai';
import { ParameterLoader } from '../../lib/loaders';

export class TestParameter {
  testParameterMethod(): void {}
}

describe('ParameterLoader', () => {
  describe('#addParameterConfig', () => {
    it(
      'Should add a new parameter configuration for a ', 
      () => {
        ParameterLoader.addParameterConfig()
        const interceptorConfigs = InterceptorLoader.interceptorConfigs;
        expect(interceptorConfigs).length.above(0);
      });
  });
});
