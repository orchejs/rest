import { HttpDecoratorOptions } from '../interfaces/http-decorator-options';
import { HttpRequestMethod } from '../constants/http-request-method';
import { MimeType } from '../constants/mimetype';
import { ContentType } from '../interfaces/content-type';
import { RouterLoader } from '../loaders/router.loader';

export function all(path: string = '', options: HttpDecoratorOptions = {}) {
  return function(
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    let ct: ContentType = options.contentType;
    if (!ct) {
      ct = {
        request: MimeType.json,
        response: MimeType.json
      };
    }
    RouterLoader.addRouteUnit(
      path,
      descriptor.value.bind(target),
      propertyKey,
      HttpRequestMethod.All,
      ct,
      options.cors
    );
  };
}

export function get(path: string = '', options: HttpDecoratorOptions = {}) {
  return function(
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    let ct: ContentType = options.contentType;
    if (!ct) {
      ct = { response: MimeType.json };
    }
    const method: Function = descriptor.value;
    RouterLoader.addRouteUnit(
      path,
      descriptor.value.bind(target),
      propertyKey,
      HttpRequestMethod.Get,
      ct,
      options.cors
    );
  };
}

export function post(path: string = '', options: HttpDecoratorOptions = {}) {
  return function(
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    let ct: ContentType = options.contentType;
    if (!ct) {
      ct = {
        request: MimeType.json,
        response: MimeType.json
      };
    }
    RouterLoader.addRouteUnit(
      path,
      descriptor.value.bind(target),
      propertyKey,
      HttpRequestMethod.Post,
      ct,
      options.cors
    );
  };
}

export function put(path: string = '', options: HttpDecoratorOptions = {}) {
  return function(
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    let ct: ContentType = options.contentType;
    if (!ct) {
      ct = {
        request: MimeType.json,
        response: MimeType.json
      };
    }
    RouterLoader.addRouteUnit(
      path,
      descriptor.value.bind(target),
      propertyKey,
      HttpRequestMethod.Put,
      ct,
      options.cors
    );
  };
}

export function del(path: string = '', options: HttpDecoratorOptions = {}) {
  return function(
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    let ct: ContentType = options.contentType;
    if (!ct) {
      ct = {
        request: MimeType.json,
        response: MimeType.json
      };
    }
    RouterLoader.addRouteUnit(
      path,
      descriptor.value.bind(target),
      propertyKey,
      HttpRequestMethod.Delete,
      ct,
      options.cors
    );
  };
}

export function patch(path: string = '', options: HttpDecoratorOptions = {}) {
  return function(
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    let ct: ContentType = options.contentType;
    if (!ct) {
      ct = {
        request: MimeType.json,
        response: MimeType.json
      };
    }
    RouterLoader.addRouteUnit(
      path,
      descriptor.value.bind(target),
      propertyKey,
      HttpRequestMethod.Patch,
      ct,
      options.cors
    );
  };
}

export function options(path: string = '', options: HttpDecoratorOptions = {}) {
  return function(
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    let ct: ContentType = options.contentType;
    if (!ct) {
      ct = {
        request: MimeType.json,
        response: MimeType.json
      };
    }
    RouterLoader.addRouteUnit(
      path,
      descriptor.value.bind(target),
      propertyKey,
      HttpRequestMethod.Options,
      ct,
      options.cors
    );
  };
}

export function head(path: string = '', options: HttpDecoratorOptions = {}) {
  return function(
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    let ct: ContentType = options.contentType;
    if (!ct) {
      ct = { response: MimeType.json };
    }
    RouterLoader.addRouteUnit(
      path,
      descriptor.value.bind(target),
      propertyKey,
      HttpRequestMethod.Head,
      ct,
      options.cors
    );
  };
}
