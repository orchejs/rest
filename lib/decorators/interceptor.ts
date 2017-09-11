import { ClassUtils } from '../utils/class.utils';
import { InterceptorDecoratorOptions } from '../interfaces/interceptor-decorator-options';
import { InterceptorLoader } from '../loaders/interceptor.loader';
import { HttpRequestMethod } from '../constants/http-request-method';

export function interceptor(
  paths: string | string[] = ['/'],
  options: InterceptorDecoratorOptions = { httpMethods: HttpRequestMethod.All }
) {
  return function(target: any) {
    const className: string = ClassUtils.getClassName(target);

    let pathsArr: string[] = [];
    if (!Array.isArray(paths)) {
      pathsArr.push(paths);
    } else {
      pathsArr = paths;
    }

    let httpMethodsArr: HttpRequestMethod[] = [];
    if (!Array.isArray(options.httpMethods)) {
      httpMethodsArr.push(options.httpMethods);
    } else {
      httpMethodsArr = options.httpMethods;
    }
    InterceptorLoader.addInterceptorConfig(pathsArr, options.order, className, httpMethodsArr);
  };
}

export function processing() {
  return function(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    InterceptorLoader.addInterceptorUnit(descriptor.value.bind(target), propertyKey);
  };
}
