import { InterceptorUnit } from './';
import { HttpRequestMethod } from '../constants';

export interface InterceptorConfig {
  path: string;
  order?: number;
  className?: string;
  httpMethods?: HttpRequestMethod[];
  interceptorUnit?: InterceptorUnit;
}
