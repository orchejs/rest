/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import {
  CorsConfig,
  RouterUnit,
  RouterConfig,
  ContentType,
  LoadStats,
  ParamConfig,
  ParamUnit
} from '../interfaces';
import * as moment from 'moment';
import { ValidatorError } from '@orchejs/validators';
import { logger, UrlUtils } from '@orchejs/common';
import { HttpRequestMethod, ParamType } from '../constants';
import { RouterLoader, InterceptorLoader, ParameterLoader } from '../loaders';

export abstract class Router {
  protected app: any;
  protected routers: any[];

  constructor(app: any) {
    this.app = app;
    this.routers = [];
  }

  public loadRouters(appPath: string = ''): LoadStats {
    const routerStats: LoadStats = {
      loadedRoutes: [],
      loadedInterceptors: [],
      initializationTime: 0
    };

    const initTime = moment();

    // interceptor routes register
    const interceptorConfigs = InterceptorLoader.interceptorConfigs;
    interceptorConfigs.forEach(config => {
      const routerUnits: RouterUnit[] = [];
      for (const httpMethod of config.httpMethods) {
        routerUnits.push({
          httpMethod,
          method: config.interceptorUnit.method,
          methodName: config.interceptorUnit.methodName
        });
      }
  
      this.addRouterToApp(config.path, config.className, routerUnits, appPath);
      routerStats.loadedInterceptors.push(config);
    });

    // endpoints register
    const routerConfigs = RouterLoader.routerConfigs;
    routerConfigs.forEach(config => {
      this.addRouterToApp(config.path, config.className, config.routerUnits, appPath);
      routerStats.loadedRoutes.push(config);
    });

    routerStats.initializationTime = initTime.diff(moment(), 'seconds');
    return routerStats;
  }

  protected abstract addRouterToApp(
    path: string,
    className: string,
    routerUnits: RouterUnit[],
    appPath: string
  ): void;

  protected buildRouter(className: string, routerUnits: RouterUnit[]): any {
    const router: any = this.createRouter();

    routerUnits.forEach(unit => {
      const routerMethod: any = this.routeExecution(
        className,
        unit.method,
        unit.methodName,
        unit.contentType
      );

      const routePath: string = UrlUtils.urlSanitation(unit.path);

      const middlewares: any[] = unit.middlewares || [];
      middlewares.push(routerMethod);

      this.addRoute(router, routePath, unit.cors, middlewares, unit.httpMethod);
    });

    return router;
  }

  protected abstract createRouter(): any;

  protected abstract routeExecution(
    target: string,
    method: Function,
    methodName: string,
    contentType: ContentType
  ): Function;

  protected loadParams(
    className: string,
    methodName: string,
    getParamValue: Function,
    args: any
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let validatorErrors: ValidatorError[] = [];
      let endpointArgs: any = [];

      const paramConfig: ParamConfig = ParameterLoader.getParameterConfig(className, methodName);
      if (paramConfig && paramConfig.params && paramConfig.params.length > 0) {
        const params: ParamUnit[] = paramConfig.params;
        for (const param of params) {
          try {
            const valueResult = await getParamValue(param, args);
            if (valueResult.validatorErrors.length > 0) {
              validatorErrors = validatorErrors.concat(valueResult.validatorErrors);
              continue;
            }
            endpointArgs[param.parameterIndex] = valueResult.value;
          } catch (e) {
            const msg = 'An error happened during parameter load';
            logger.error(msg, { details: e });
            return reject(msg);
          }
        }
      } else {
        endpointArgs = args;
      }
      if (validatorErrors.length > 0) {
        reject(validatorErrors);
      } else {
        resolve(endpointArgs);
      }
    });
  }

  protected abstract getParamValue(
    param: ParamUnit,
    args: any
  ): Promise<{
    validatorErrors: ValidatorError[];
    value: any;
  }>;

  protected abstract addRoute(
    router: any,
    path: string,
    corsConfig: CorsConfig,
    middlewares: any[],
    httpMethod: HttpRequestMethod
  ): void;
}
