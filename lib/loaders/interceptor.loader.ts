import { PathUtils } from '../utils/path.utils';
import { InterceptorConfig } from '../interfaces/interceptor-config';
import { InterceptorUnit } from '../interfaces/interceptor-unit';
import { InterceptorType } from '../constants/interceptor-type';

export class InterceptorLoader {

  static interceptorConfigs: InterceptorConfig[] = [];
  static interceptorUnits: InterceptorUnit[] = [];

  static addInterceptorUnit(method: any, type: InterceptorType, methodName: string) {
    const interceptorUnit: InterceptorUnit = {
      method,
      methodName,
      type,
    };

    this.interceptorUnits.push(interceptorUnit);
  }

  static addInterceptorConfig(paths?: string[], order?: number, className?: string) {
    const interceptorPaths: string[] = paths || ['/'];
    const interceptorOrder: number = order || this.interceptorConfigs.length + 1;
    const interceptorClassName: string = className || '';

    const interceptorConfig: InterceptorConfig = {
      paths: interceptorPaths,
      order: interceptorOrder,
      className: interceptorClassName,
      interceptorUnits: this.interceptorUnits,
    };

    this.interceptorConfigs.push(interceptorConfig);
    this.interceptorConfigs.sort((a, b) => a.order - b.order);
    this.interceptorUnits = [];
  }

}
