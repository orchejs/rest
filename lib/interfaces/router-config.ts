/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { RouterUnit } from './router-unit';

export interface RouterConfig {
  path: string;
  className: string;
  routerUnits: RouterUnit[];
}
