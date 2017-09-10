import { InterceptorConfig } from '../interfaces/interceptor-config';
import { InterceptorUnit } from '../interfaces/interceptor-unit';
import { HttpRequestMethod } from '../constants/http-request-method';

export class InterceptorLoader {
  static interceptorConfigs: InterceptorConfig[] = [];
  static interceptorUnit: InterceptorUnit;

  static addInterceptorConfig(
    paths?: string[],
    order?: number,
    className?: string,
    httpMethods?: HttpRequestMethod[]
  ) {
    const interceptorPaths: string[] = paths || ['/'];
    const interceptorOrder: number = order || this.interceptorConfigs.length + 1;
    const interceptorClassName: string = className || '';
    const interceptorHttpMethods: HttpRequestMethod[] = httpMethods || [];

    let interceptorConfig: InterceptorConfig;

    interceptorConfig = {
      paths: interceptorPaths,
      order: interceptorOrder,
      className: interceptorClassName,
      httpMethods: interceptorHttpMethods,
      interceptorUnit: this.interceptorUnit
    };

    this.interceptorConfigs.push(interceptorConfig);
    this.interceptorConfigs.sort((a, b) => a.order - b.order);
  }

  static addInterceptorUnit(method: any, methodName: string) {
    const interceptorUnit: InterceptorUnit = {
      method,
      methodName
    };

    this.interceptorUnit = interceptorUnit;
  }
}
