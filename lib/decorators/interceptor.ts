import { InterceptorDecoratorOptions } from '../interfaces/interceptor-decorator-options';
import { InterceptorLoader } from '../loaders/interceptor.loader';
import { HttpRequestMethod } from '../constants/http-request-method';


export function interceptor(
  paths: string | string[] = ['/'],
  options: InterceptorDecoratorOptions = {
    httpMethods: HttpRequestMethod.All,
  }) {
  return function (target: any) {
    const className: any = target.toString().match(/(function|class) ([^{(]*)/i)[2].trim();

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
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    InterceptorLoader.addInterceptorUnit(descriptor.value.bind(target),
      propertyKey);
  };
}
