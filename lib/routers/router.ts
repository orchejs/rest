import {
  CorsConfig,
  RouterUnit,
  RouterConfig,
  ContentType,
  LoadRouterStats,
  ValidatorError,
  ParamConfig,
  ParamUnit
} from '../interfaces';
import * as moment from 'moment';
import { HttpRequestMethod, ParamType } from '../constants';
import { UrlUtils, logger } from '../utils';
import { RouterLoader, ParameterLoader } from '../loaders';

export abstract class Router {
  protected app: any;
  protected routers: any[];

  constructor(app: any) {
    this.app = app;
    this.routers = [];
  }

  protected abstract createRouter(): any;

  protected abstract addRouterToApp(appPath: string, routerPath: string, router: any): void;

  protected abstract addRoute(
    router: any,
    path: string,
    corsConfig: CorsConfig,
    middlewares: any[],
    httpMethod: HttpRequestMethod
  ): void;

  protected abstract routeExecution(
    target: string,
    method: Function,
    methodName: string,
    contentType: ContentType
  ): Function;

  protected abstract getParamValue(
    param: ParamUnit,
    validatorErrors: ValidatorError[],
    ...args: any[]
  ): Promise<any>;

  public loadRouters(appPath: string): LoadRouterStats {
    const routerStats: LoadRouterStats = {
      loadedRoutes: [],
      initializationTime: 0
    };

    const initTime = moment();
    const routerConfigs = RouterLoader.routerConfigs;

    routerConfigs.forEach(config => {
      const routerPath = UrlUtils.urlSanitation(config.path);
      const router: any = this.buildRouter(config.className, config.routerUnits);
      this.addRouterToApp(appPath, routerPath, router);
      routerStats.loadedRoutes.push(config);
    });

    routerStats.initializationTime = initTime.diff(moment(), 'seconds');
    return routerStats;
  }

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

      const middlewares: any[] = unit.middlewares;
      middlewares.push(routerMethod);

      this.addRoute(router, routePath, unit.cors, middlewares, unit.httpMethod);
    });

    return router;
  }

  protected loadParams(
    className: string,
    methodName: string,
    getParamValue: Function,
    args: any
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const validatorErrors: ValidatorError[] = [];
      let endpointArgs: any = [];

      const paramConfig: ParamConfig = ParameterLoader.getParameterConfig(className, methodName);
      if (paramConfig && paramConfig.params && paramConfig.params.length > 0) {
        const params: ParamUnit[] = paramConfig.params;
        for (const param of params) {
          try {
            const paramValue = await getParamValue(param, validatorErrors, args);
            endpointArgs[param.parameterIndex] = paramValue;
          } catch (e) {
            const msg = 'An error happened during parameter load.';
            logger.error(msg, { details: e });
            reject(msg);
            return;
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
}
