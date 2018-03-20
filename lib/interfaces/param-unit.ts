/**
 * @license
 * Copyright Mauricio Gemelli Vigolo and contributors.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { ParamDetails } from './param-details';
import { ParamType } from '../constants/param-type';

export interface ParamUnit {
  type: ParamType;
  parameterIndex: number;
  paramDetails?: ParamDetails;
}
