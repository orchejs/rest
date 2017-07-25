import { InterceptorLoader } from '../loaders/interceptor.loader';
import { InterceptorType } from '../constants/interceptor-type';


export function interceptor(paths: string | string[] = ['/'], order?: number) {
  return function (target: any) {
    const className: any = target.toString().match(/(function|class) ([^{(]*)/i);
    let pathsArr: string[] = [];
    if (!Array.isArray(paths)) {
      pathsArr.push(paths);
    } else {
      pathsArr = paths;
    }
    InterceptorLoader.addInterceptorConfig(pathsArr, order, className);
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
