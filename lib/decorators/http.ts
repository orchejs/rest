import { HttpRequestMethod } from '../constants/http-request-method';
import { RouterLoader } from '../loaders/router.loader';
import { CorsOptions } from '../interfaces/cors-options';


export function all(path: string = '', corsOptions?: CorsOptions, preflight?: boolean) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey,
                              HttpRequestMethod.All);
  };
}

export function get(path: string = '', corsOptions?: CorsOptions, preflight?: boolean) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const method: Function = descriptor.value;
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey, 
                              HttpRequestMethod.Get);
  };
}

export function post(path: string = '', corsOptions?: CorsOptions, preflight?: boolean) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey, 
                              HttpRequestMethod.Post);
  };
}

export function put(path: string = '', corsOptions?: CorsOptions, preflight?: boolean) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey, 
                              HttpRequestMethod.Put);
  };
}

export function del(path: string = '', corsOptions?: CorsOptions, preflight?: boolean) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey, 
                              HttpRequestMethod.Delete);
  };
}

export function patch(path: string = '', corsOptions?: CorsOptions, preflight?: boolean) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey, 
                              HttpRequestMethod.Patch);
  };
}

export function options(path: string = '', corsOptions?: CorsOptions) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey,
                              HttpRequestMethod.Options);
  };
}

export function head(path: string = '', corsOptions?: CorsOptions, preflight?: boolean) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey, 
                              HttpRequestMethod.Head);
  };
}
