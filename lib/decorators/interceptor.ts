import { InterceptorLoader } from '../loaders/interceptor.loader';
import { InterceptorType } from '../constants/interceptor-type';
import { HttpRequestMethod } from '../constants/http-request-method';


export function interceptor(paths: string | string[] = ['/'], 
                            httpMethods: HttpRequestMethod | HttpRequestMethod[] 
                            = [HttpRequestMethod.All], 
                            order?: number) {
  return function (target: any) {
    const className: any = target.toString().match(/(function|class) ([^{(]*)/i)[2].trim();

    let pathsArr: string[] = [];
    if (!Array.isArray(paths)) {
      pathsArr.push(paths);
    } else {
      pathsArr = paths;
    }

    let httpMethodsArr: HttpRequestMethod[] = [];
    if (!Array.isArray(httpMethods)) {
      httpMethodsArr.push(httpMethods);
    } else {
      httpMethodsArr = httpMethods;
    }
    InterceptorLoader.addInterceptorConfig(pathsArr, order, className, httpMethodsArr);
  };
}

export function preProcessing() {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    InterceptorLoader.addInterceptorUnit(descriptor.value.bind(target),
                                         InterceptorType.PreProcessing,
                                         propertyKey);
  };
}

export function postProcessing() {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    InterceptorLoader.addInterceptorUnit(descriptor.value.bind(target),
                                         InterceptorType.PostProcessing,
                                         propertyKey);
  };
}
