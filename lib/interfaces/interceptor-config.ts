import { InterceptorUnit } from './interceptor-unit';
import { HttpRequestMethod } from '../constants/http-request-method';

export interface InterceptorConfig {
  paths?: string[];
  order?: number;
  className?: string;
  httpMethods?: HttpRequestMethod[];
  interceptorUnit?: InterceptorUnit;
}
