import { HttpRequestMethod } from '../constants/httprequestmethod';
import { CorsOptions } from '../interfaces/corsoptions';
import { RouterConfig } from '../interfaces/routerconfig';
import { RouterUnit } from '../interfaces/routerunit';


export class RouteLoader {

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
                      httpMethod: HttpRequestMethod, corsOptions?: CorsOptions, 
                      preflight?: boolean) {

    const routerUnit: RouterUnit = {
      path,
      methodName,
      method,
      httpMethod,
      corsOptions,
      preflight,
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
