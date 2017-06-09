import { ParamType } from '../constants/param-type';

export interface ParamUnit {
  type: ParamType;
  parameterIndex: number;
  paramName?: string;
}
