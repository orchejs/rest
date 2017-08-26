import { HttpRequestMethod } from '../constants/http-request-method';

export interface InterceptorDecoratorOptions {
  httpMethods?: HttpRequestMethod | HttpRequestMethod[];
  order?: number;
}
