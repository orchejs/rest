/**
 * @license
 * Copyright Mauricio Gemelli Vigolo.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { HttpRequestMethod } from '../../lib/constants/index';
import { expect } from 'chai';
import { RouterConfig, RouterUnit, LoadedRoutes } from '../../lib/interfaces';
import { RouterLoader } from '../../lib/loaders';
import { ClassUtils } from '@orchejs/common';

export class RouterExample {
  routerMethod(): void { }
}

describe('RouterLoader', () => {
  let className: string;
  let example: RouterExample;
  let routerConfig: RouterConfig;

  before(() => {
    example = new RouterExample();

    RouterLoader.addRouteUnit(
      'test', 
      example.routerMethod,
      'routerMethod',
      HttpRequestMethod.Delete,
    );    

    className = ClassUtils.getClassName(example);
    RouterLoader.addRouterConfig(
      className,
      'main-tests'
    );

    routerConfig = RouterLoader.routerConfigs.find(
      routerConfig => routerConfig.className === className
    );
  });

  describe('#addRouterConfig', () => {
    it('Should add a new router config', () => {
      expect(routerConfig).to.be.not.undefined;
    });

    it('Should have one router unit in router config', () => {
      expect(routerConfig.routerUnits.length).to.be.eq(1);
    });    
  });

  describe('#formatLoadedRoutes', () => {
    it('Should return an empty array if no RouterConfigs are passed as argument', () => {
      const loadedRoutes: LoadedRoutes[] = RouterLoader.formatLoadedRoutes('main-tests');
      expect(loadedRoutes.length).to.be.eq(0);
    });

    it('Should return the loaded routes from main-tests, should be greater than 0', () => {
      const loadedRoutes: LoadedRoutes[] = RouterLoader.formatLoadedRoutes(
        'main-tests', 
        [routerConfig]
      );
      expect(loadedRoutes.length).to.be.gt(0);
    });    
  });
});
