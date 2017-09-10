import { HttpRequestMethod } from '../constants/http-request-method';
import { RouterConfig } from '../interfaces/router-config';
import { RouterUnit } from '../interfaces/router-unit';
import { ContentType } from '../interfaces/content-type';
import { CorsConfig } from '../interfaces/cors-config';

export class RouterLoader {
  static routerConfigs: RouterConfig[] = [];
  static routerUnits: RouterUnit[] = [];

  static addRouteUnit(
    path: string,
    method: Function,
    methodName: string,
    httpMethod: HttpRequestMethod,
    contentType?: ContentType,
    cors?: CorsConfig,
    ...middlewares: Function[]
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

  static addRouterConfig(className: string, path: string) {
    const routerConfig: RouterConfig = {
      path,
      className,
      routerUnits: this.routerUnits
    };

    this.routerConfigs.push(routerConfig);
    this.routerUnits = [];
  }
}
