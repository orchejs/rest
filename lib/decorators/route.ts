/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { ClassUtils } from '@orchejs/common';
import { RouterLoader } from '../loaders';

export function Route(path: string = '') {
  return function (target: object) {
    const className: string = ClassUtils.getClassName(target);
    if (className) {
      let routerPath = path;
      if (routerPath === '') {
        routerPath = className.toLowerCase();
      }
      RouterLoader.addRouterConfig(className, routerPath);
    }
  };
}
