import { HttpRequestMethod } from '../constants/http-request-method';
import { MimeType } from '../constants/mimetype';
import { ContentType } from '../interfaces/content-type';
import { RouterLoader } from '../loaders/router.loader';
import { CorsConfig } from '../interfaces/cors-config';


export function all(path: string = '',
                    contentType: ContentType = { 
                      request: MimeType.json, 
                      response: MimeType.json, 
                    },
                    cors?: CorsConfig) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey,
                              HttpRequestMethod.All);
  };
}

export function get(path: string = '',
                    contentType: ContentType = { 
                      response: MimeType.json, 
                    },
                    cors?: CorsConfig) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const method: Function = descriptor.value;
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey, 
                              HttpRequestMethod.Get);
  };
}

export function post(path: string = '',
                     contentType: ContentType = { 
                       request: MimeType.json, 
                       response: MimeType.json, 
                     },
                     cors?: CorsConfig) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey, 
                              HttpRequestMethod.Post);
  };
}

export function put(path: string = '',
                    contentType: ContentType = { 
                      request: MimeType.json, 
                      response: MimeType.json, 
                    },
                    cors?: CorsConfig) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey, 
                              HttpRequestMethod.Put);
  };
}

export function del(path: string = '',
                    contentType: ContentType = { 
                      request: MimeType.json, 
                      response: MimeType.json, 
                    },
                    cors?: CorsConfig) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey, 
                              HttpRequestMethod.Delete);
  };
}

export function patch(path: string = '',
                      contentType: ContentType = { 
                        request: MimeType.json, 
                        response: MimeType.json, 
                      },
                      cors?: CorsConfig) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey, 
                              HttpRequestMethod.Patch);
  };
}

export function options(path: string = '',
                        contentType: ContentType = { 
                          request: MimeType.json, 
                          response: MimeType.json, 
                        },
                        cors?: CorsConfig) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey,
                              HttpRequestMethod.Options);
  };
}

export function head(path: string = '',
                     contentType: ContentType = { 
                       response: MimeType.json, 
                     },
                     cors?: CorsConfig) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    RouterLoader.addRouteUnit(path, descriptor.value.bind(target), propertyKey, 
                              HttpRequestMethod.Head);
  };
}
