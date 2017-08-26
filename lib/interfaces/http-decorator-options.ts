import { CorsConfig } from './cors-config';
import { ContentType } from './content-type';

export interface HttpDecoratorOptions {
  contentType?: ContentType;
  cors?: CorsConfig;
  middlewares?: Function | Function[];
}
