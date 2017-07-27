import { InterceptorConfig } from './interceptor-config';

export interface LoadInterceptorStats {

  loadedInterceptors?: InterceptorConfig[];
  initializationTime?: number;

}
