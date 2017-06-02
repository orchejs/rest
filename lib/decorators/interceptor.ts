import { InterceptorLoader } from '../loaders/interceptor.loader';
import { InterceptorType } from '../constants/interceptortype';


export function interceptor(paths: string[] = ['/'], order?: number) {
  return function (target: any) {
    InterceptorLoader.addInterceptorConfig(paths, order);
  };
}

export function preProcessing() {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    InterceptorLoader.addInterceptorUnit(descriptor.value.bind(target),
                                         InterceptorType.PreProcessing);
  };
}

export function postProcessing() {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    InterceptorLoader.addInterceptorUnit(descriptor.value.bind(target),
                                         InterceptorType.PostProcessing);
  };
}
