import { InterceptorConfig } from './interceptor-config';

export interface LoadInterceptorStats {

  loadedPreProcessingInterceptors?: InterceptorConfig[];
  loadedPostProcessingInterceptors?: InterceptorConfig[];
  initializationTime?: number;

}
