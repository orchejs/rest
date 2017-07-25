import { InterceptorUnit } from './interceptor-unit';

export interface InterceptorConfig {
  paths?: string[];
  order?: number;
  className?: string;
  interceptorUnits?: InterceptorUnit[];
}
