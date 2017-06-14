import { CorsOptions } from './cors-options';
import { HttpRequestMethod } from '../constants/http-request-method';
import { ContentType } from '../interfaces/content-type';
import { CorsConfig } from '../interfaces/cors-config';

export interface RouterUnit {
  path?: string;
  methodName?: string;
  method?: any;
  httpMethod?: HttpRequestMethod;
  contentType?: ContentType;
  cors?: CorsConfig;
}
