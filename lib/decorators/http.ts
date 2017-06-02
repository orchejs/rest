import { HttpRequestMethod } from '../constants/httprequestmethod';
import { RouteLoader } from '../loaders/route.loader';
import { CorsOptions } from '../interfaces/corsoptions';


export function all(path: string = '', corsOptions?: CorsOptions, preflight?: boolean) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouteLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey,
                             HttpRequestMethod.All);
  };
}

export function get(path: string = '', corsOptions?: CorsOptions, preflight?: boolean) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const method: Function = descriptor.value;
    RouteLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey, 
                             HttpRequestMethod.Get);
  };
}

export function post(path: string = '', corsOptions?: CorsOptions, preflight?: boolean) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouteLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey, 
                             HttpRequestMethod.Post);
  };
}

export function put(path: string = '', corsOptions?: CorsOptions, preflight?: boolean) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouteLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey, 
                             HttpRequestMethod.Put);
  };
}

export function del(path: string = '', corsOptions?: CorsOptions, preflight?: boolean) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouteLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey, 
                             HttpRequestMethod.Delete);
  };
}

export function patch(path: string = '', corsOptions?: CorsOptions, preflight?: boolean) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouteLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey, 
                             HttpRequestMethod.Patch);
  };
}

export function options(path: string = '', corsOptions?: CorsOptions) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouteLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey,
                             HttpRequestMethod.Options);
  };
}

export function head(path: string = '', corsOptions?: CorsOptions, preflight?: boolean) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouteLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey, 
                             HttpRequestMethod.Head);
  };
}
