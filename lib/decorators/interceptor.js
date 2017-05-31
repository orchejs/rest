/*
import { InterceptorLoader } from '../loaders/interceptorloader';
import { InterceptorMethodType } from '../constants/interceptormethodtype';

export function Interceptor(paths: Array<string> = ['/'], order?: number) {
  return function (target: any) {
    InterceptorLoader.addInterceptorConfig(paths, order);
  };
}

export function PreProcessing() {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    InterceptorLoader.addInterceptorUnit(descriptor.value.bind(target),
      InterceptorMethodType.PreProcessing);
  };
}

export function PostProcessing() {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    InterceptorLoader.addInterceptorUnit(descriptor.value.bind(target),
      InterceptorMethodType.PostProcessing);
  };
}
*/
