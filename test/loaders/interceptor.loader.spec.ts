/**
 * @license
 * Copyright Mauricio Gemelli Vigolo.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { expect } from 'chai';
import { InterceptorLoader } from '../../lib/loaders';

describe('InterceptorLoader', () => {
  describe('#addInterceptorConfig', () => {
    it(
      'Should initialize the interceptor using the default options - order, classname and methods', 
      () => {
        InterceptorLoader.addInterceptorConfig();
        const interceptorConfigs = InterceptorLoader.interceptorConfigs;
        expect(interceptorConfigs).length.above(0);
      });
  });
});
