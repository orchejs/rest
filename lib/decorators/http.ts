/**
 * @license
 * Copyright Mauricio Gemelli Vigolo.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */

import { HttpDecoratorOptions, ContentType } from '../interfaces';
import { HttpRequestMethod, MimeType } from '../constants';
import { RouterLoader } from '../loaders';

export function all(path: string = '/*', options: HttpDecoratorOptions = {}) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const ct: ContentType = options.contentType || {
      request: MimeType.json,
      response: MimeType.json
    };
    const instance = new target.constructor();
    RouterLoader.addRouteUnit(
      path,
      descriptor.value.bind(instance),
      propertyKey,
      HttpRequestMethod.All,
      ct,
      options.cors,
      options.middlewares
    );
  };
}

export function get(path: string = '', options: HttpDecoratorOptions = {}) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const ct: ContentType = options.contentType || {
      response: MimeType.json
    };
    const instance = new target.constructor();
    RouterLoader.addRouteUnit(
      path,
      descriptor.value.bind(instance),
      propertyKey,
      HttpRequestMethod.Get,
      ct,
      options.cors,
      options.middlewares
    );
  };
}

export function post(path: string = '', options: HttpDecoratorOptions = {}) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const ct: ContentType = options.contentType || {
      request: MimeType.json,
      response: MimeType.json
    };
    const instance = new target.constructor();
    RouterLoader.addRouteUnit(
      path,
      descriptor.value.bind(instance),
      propertyKey,
      HttpRequestMethod.Post,
      ct,
      options.cors,
      options.middlewares
    );
  };
}

export function put(path: string = '', options: HttpDecoratorOptions = {}) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const ct: ContentType = options.contentType || {
      request: MimeType.json,
      response: MimeType.json
    };
    const instance = new target.constructor();
    RouterLoader.addRouteUnit(
      path,
      descriptor.value.bind(instance),
      propertyKey,
      HttpRequestMethod.Put,
      ct,
      options.cors,
      options.middlewares
    );
  };
}

export function del(path: string = '', options: HttpDecoratorOptions = {}) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const ct: ContentType = options.contentType || {
      request: MimeType.json,
      response: MimeType.json
    };
    const instance = new target.constructor();
    RouterLoader.addRouteUnit(
      path,
      descriptor.value.bind(instance),
      propertyKey,
      HttpRequestMethod.Delete,
      ct,
      options.cors,
      options.middlewares
    );
  };
}

export function patch(path: string = '', options: HttpDecoratorOptions = {}) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const ct: ContentType = options.contentType || {
      request: MimeType.json,
      response: MimeType.json
    };
    const instance = new target.constructor();
    RouterLoader.addRouteUnit(
      path,
      descriptor.value.bind(instance),
      propertyKey,
      HttpRequestMethod.Patch,
      ct,
      options.cors,
      options.middlewares
    );
  };
}

export function head(path: string = '', options: HttpDecoratorOptions = {}) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const ct: ContentType = options.contentType || { response: MimeType.json };
    const instance = new target.constructor();
    RouterLoader.addRouteUnit(
      path,
      descriptor.value.bind(instance),
      propertyKey,
      HttpRequestMethod.Head,
      ct,
      options.cors,
      options.middlewares
    );
  };
}
