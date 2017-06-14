import { CorsOptions } from './cors-options';
import { HttpRequestMethod } from '../constants/http-request-method';

export interface RouterUnit {
  path?: string;
  methodName?: string;
  method?: any;
  httpMethod?: HttpRequestMethod;
  contentType?: any;
  cors?: any;
}
