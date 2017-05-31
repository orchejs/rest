import { ParamType } from '../constants/paramtype';

export interface ParamUnit {
  type: ParamType;
  parameterIndex: number;
  paramName?: string;
}
