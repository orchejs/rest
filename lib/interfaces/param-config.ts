/**
 * @license
 * Copyright Mauricio Gemelli Vigolo.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { ParamUnit } from './param-unit';

export interface ParamConfig {
  className?: string;
  methodName?: string;
  params?: ParamUnit[];
}
