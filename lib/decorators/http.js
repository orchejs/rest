/*
import { HttpRequestMethod } from '../constants/httprequestmethod';
import { RouterLoader } from '../loaders/routerloader';
import { CorsOptions } from 'cors';


export function All(path: string = '', corsOptions?: CorsOptions, preflight?: boolean) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey,
      HttpRequestMethod.ALL);
  };
}

export function Get(path: string = '', corsOptions?: CorsOptions, preflight?: boolean) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    let method: Function = descriptor.value;
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey,
      HttpRequestMethod.GET);
  };
}

export function Post(path: string = '', corsOptions?: CorsOptions, preflight?: boolean) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey,
      HttpRequestMethod.POST);
  };
}

export function Put(path: string = '', corsOptions?: CorsOptions, preflight?: boolean) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target),
      propertyKey, HttpRequestMethod.PUT);
  };
}

export function Delete(path: string = '', corsOptions?: CorsOptions, preflight?: boolean) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target),
      propertyKey, HttpRequestMethod.DELETE);
  };
}

export function Patch(path: string = '', corsOptions?: CorsOptions, preflight?: boolean) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target),
      propertyKey, HttpRequestMethod.PATCH);
  };
}

export function Options(path: string = '', corsOptions?: CorsOptions) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target),
      propertyKey, HttpRequestMethod.OPTIONS);
  };
}

export function Head(path: string = '', corsOptions?: CorsOptions, preflight?: boolean) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target),
      propertyKey, HttpRequestMethod.HEAD);
  };
}
*/
