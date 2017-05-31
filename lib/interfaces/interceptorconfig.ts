import { InterceptorUnit } from './interceptorunit';

export interface InterceptorConfig {
  paths?: string[];
  order?: number;
  interceptorUnits?: InterceptorUnit[];
}
