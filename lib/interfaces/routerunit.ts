import { CorsOptions } from './corsoptions';
import { HttpRequestMethod } from '../constants/httprequestmethod';

export interface RouterUnit {
  path?: string;
  methodName?: string;
  method?: any;
  httpMethod?: HttpRequestMethod;
  corsOptions?: CorsOptions;
  preflight?: boolean;
}
