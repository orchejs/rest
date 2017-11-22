/**
 * @license
 * Copyright Mauricio Gemelli Vigolo.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { ValidatorRunner, ValidatorDetails } from '@orchejs/validators';
import { ClassUtils } from '@orchejs/common';
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
    const className = ClassUtils.getClassName(target.constructor);
    let paramConfig: ParamConfig = this.paramsConfig.find(
      pConfig => pConfig.methodName === methodName && pConfig.className === className
    );

    if (!paramConfig) {
      paramConfig = {
        className,
        methodName,
        params: []
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
