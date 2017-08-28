import { ParamDetails } from './param-details';
import { ParamType } from '../constants/param-type';

export interface ParamUnit {
  type: ParamType;
  parameterIndex: number;
  paramDetails?: ParamDetails;
}
