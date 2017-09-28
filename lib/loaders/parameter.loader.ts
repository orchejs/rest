/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { ValidatorRunner, ValidatorDetails } from '@orchejs/validators';
import { ParamType } from '../constants';
import { ParamDetails, ParamConfig } from '../interfaces';

export class ParameterLoader {
  private static paramsConfig: ParamConfig[] = [];

  static addParameterConfig(
    target: object,
    methodName: string,
    paramDetails: ParamDetails,
    paramIndex: number,
    paramType: ParamType
  ) {
    let paramConfig: ParamConfig = this.paramsConfig.find(
      pConfig => pConfig.methodName === methodName && pConfig.className === target.constructor.name
    );

    if (!paramConfig) {
      paramConfig = {
        methodName,
        params: [],
        className: target.constructor.name
      };
    }

    paramConfig.params.push({
      paramDetails,
      type: paramType,
      parameterIndex: paramIndex
    });

    paramConfig.params.sort((a, b) => a.parameterIndex - b.parameterIndex);

    this.paramsConfig.push(paramConfig);
  }

  static getParameterConfig(className: string, methodName: string): ParamConfig {
    let paramConfig: ParamConfig;

    if (this.paramsConfig) {
      paramConfig = this.paramsConfig.find(
        pConfig => pConfig.methodName === methodName && pConfig.className === className
      );
    }

    return paramConfig;
  }
}
