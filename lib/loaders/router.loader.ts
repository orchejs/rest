/**
 * @license
 * Copyright Mauricio Gemelli Vigolo and contributors.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { HttpRequestMethod } from '../constants/http-request-method';
import { RouterConfig, RouterUnit, ContentType, CorsConfig, LoadedRoutes } from '../interfaces';
import { UrlUtils } from '@orchejs/common';

export class RouterLoader {
  static routerConfigs: RouterConfig[] = [];
  static routerUnits: RouterUnit[] = [];

  static addRouterConfig(className: string, path: string) {
    const routerConfig: RouterConfig = {
      path,
      className,
      routerUnits: this.routerUnits
    };

    this.routerConfigs.push(routerConfig);
    this.routerUnits = [];
  }

  static addRouteUnit(
    path: string,
    method: Function,
    methodName: string,
    httpMethod: HttpRequestMethod,
    contentType?: ContentType,
    cors?: CorsConfig,
    middlewares?: Function[]
  ) {
    const routerUnit: RouterUnit = {
      path,
      methodName,
      method,
      httpMethod,
      contentType,
      cors,
      middlewares
    };

    this.routerUnits.push(routerUnit);
  }

  static formatLoadedRoutes(appPath: string, routerConfigs: RouterConfig[] = []): LoadedRoutes[] {
    const loadedRoutes: LoadedRoutes[] = [];
    const rootPath = UrlUtils.urlSanitation(appPath);
    for (const routerConfig of routerConfigs) {
      const routerPath = UrlUtils.urlSanitation(routerConfig.path);
      routerConfig.routerUnits.forEach(unit => {
        const unitPath = UrlUtils.urlSanitation(unit.path);
        loadedRoutes.push({
          path: rootPath + routerPath + unitPath,
          httpMethod: HttpRequestMethod[unit.httpMethod]
        });
      });
    }
    return loadedRoutes;
  }
}
