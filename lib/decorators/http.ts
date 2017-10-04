/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */

import { HttpDecoratorOptions, ContentType } from '../interfaces';
import { HttpRequestMethod, MimeType } from '../constants';
import { RouterLoader } from '../loaders';

export function All(path: string = '/*', options: HttpDecoratorOptions = {}) {
  return function(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    const ct: ContentType = options.contentType || {
      request: MimeType.json,
      response: MimeType.json
    };
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

export function Get(path: string = '', options: HttpDecoratorOptions = {}) {
  return function(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    const ct: ContentType = options.contentType || {
      response: MimeType.json
    };
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

export function Post(path: string = '', options: HttpDecoratorOptions = {}) {
  return function(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    const ct: ContentType = options.contentType || {
      request: MimeType.json,
      response: MimeType.json
    };
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

export function Put(path: string = '', options: HttpDecoratorOptions = {}) {
  return function(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    const ct: ContentType = options.contentType || {
      request: MimeType.json,
      response: MimeType.json
    };
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

export function Delete(path: string = '', options: HttpDecoratorOptions = {}) {
  return function(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    const ct: ContentType = options.contentType || {
      request: MimeType.json,
      response: MimeType.json
    };
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

export function Patch(path: string = '', options: HttpDecoratorOptions = {}) {
  return function(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    const ct: ContentType = options.contentType || {
      request: MimeType.json,
      response: MimeType.json
    };
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

export function Head(path: string = '', options: HttpDecoratorOptions = {}) {
  return function(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    const ct: ContentType = options.contentType || { response: MimeType.json };
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
