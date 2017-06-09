import { PathUtils } from '../utils/path.utils';
import { InterceptorConfig } from '../interfaces/interceptor-config';
import { InterceptorUnit } from '../interfaces/interceptor-unit';
import { InterceptorType } from '../constants/interceptor-type';

export class InterceptorLoader {

  static interceptorConfigs: InterceptorConfig[] = [];
  static interceptorUnits: InterceptorUnit[] = [];

  static addInterceptorUnit(classMethod: any, type: InterceptorType) {
    const interceptorUnit: InterceptorUnit = {
      classMethod,
      type,
    };

    this.interceptorUnits.push(interceptorUnit);
  }

  static addInterceptorConfig(paths?: string[], order?: number) {
    const interceptorPaths: string[] = paths || ['/'];
    const interceptorOrder: number = order || this.interceptorConfigs.length + 1;

    const interceptorConfig: InterceptorConfig = {
      paths: interceptorPaths,
      order: interceptorOrder,
      interceptorUnits: this.interceptorUnits,
    };

    this.interceptorConfigs.push(interceptorConfig);
    this.interceptorConfigs.sort((a, b) => a.order - b.order);
    this.interceptorUnits = [];
  }

}
