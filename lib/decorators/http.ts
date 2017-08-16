import { HttpRequestMethod } from '../constants/http-request-method';
import { MimeType } from '../constants/mimetype';
import { ContentType } from '../interfaces/content-type';
import { RouterLoader } from '../loaders/router.loader';
import { CorsConfig } from '../interfaces/cors-config';


export function all(path: string = '', contentType?: ContentType, cors?: CorsConfig) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    let ct: ContentType = contentType;
    if (!ct) {
      ct = { 
        request: MimeType.json,
        response: MimeType.json };
    }
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey, 
                              HttpRequestMethod.All, ct, cors);
  };
}

export function get(path: string = '', contentType?: ContentType, cors?: CorsConfig) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    let ct: ContentType = contentType;
    if (!ct) {
      ct = { response: MimeType.json };
    }
    const method: Function = descriptor.value;
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey,
                              HttpRequestMethod.Get, ct, cors);
  };
}

export function post(path: string = '', contentType?: ContentType, cors?: CorsConfig) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    let ct: ContentType = contentType;
    if (!ct) {
      ct = {
        request: MimeType.json,
        response: MimeType.json };
    }
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey,
                              HttpRequestMethod.Post, ct, cors);
  };
}

export function put(path: string = '', contentType?: ContentType, cors?: CorsConfig) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    let ct: ContentType = contentType;
    if (!ct) {
      ct = {
        request: MimeType.json,
        response: MimeType.json };
    }
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey,
                              HttpRequestMethod.Put, ct, cors);
  };
}

export function del(path: string = '', contentType?: ContentType, cors?: CorsConfig) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    let ct: ContentType = contentType;
    if (!ct) {
      ct = {
        request: MimeType.json,
        response: MimeType.json };
    }
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey,
                              HttpRequestMethod.Delete, ct, cors);
  };
}

export function patch(path: string = '', contentType?: ContentType, cors?: CorsConfig) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    let ct: ContentType = contentType;
    if (!ct) {
      ct = {
        request: MimeType.json,
        response: MimeType.json };
    }
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey,
                              HttpRequestMethod.Patch, ct, cors);
  };
}

export function options(path: string = '', contentType?: ContentType, cors?: CorsConfig) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    let ct: ContentType = contentType;
    if (!ct) {
      ct = {
        request: MimeType.json,
        response: MimeType.json };
    }
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey,
                              HttpRequestMethod.Options, ct, cors);
  };
}

export function head(path: string = '', contentType?: ContentType, cors?: CorsConfig) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    let ct: ContentType = contentType;
    if (!ct) {
      ct = { response: MimeType.json };
    }    
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey,
                              HttpRequestMethod.Head, ct, cors);
  };
}
