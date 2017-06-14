import { HttpRequestMethod } from '../constants/http-request-method';
import { CorsOptions } from '../interfaces/cors-options';
import { RouterConfig } from '../interfaces/router-config';
import { RouterUnit } from '../interfaces/router-unit';


export class RouterLoader {

  static routerConfigs: RouterConfig[] = [];
  static routerUnits: RouterUnit[] = [];

  /**
   * TODO: explain the decorator load order... 
   * 
   * @param path
   * @param method 
   * @param methodName 
   * @param httpMethod 
   * @param corsOptions 
   * @param preflight 
   */
  static addRouteUnit(path: string, method: Function, methodName: string, 
                      httpMethod: HttpRequestMethod, contentType?: any, cors?: any) {

    const routerUnit: RouterUnit = {
      path,
      methodName,
      method,
      httpMethod,
      contentType,
      cors,
    };

    this.routerUnits.push(routerUnit);
  }

  static addRouterConfig(className: string, path: string) {
    const routerConfig: RouterConfig = {
      path,
      className,
      routerUnits: this.routerUnits,
    };

    this.routerConfigs.push(routerConfig);

    this.routerUnits = [];
  }

}
