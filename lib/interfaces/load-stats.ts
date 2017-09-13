import { RouterConfig, InterceptorConfig } from './';

export interface LoadStats {
  loadedRoutes?: RouterConfig[];
  loadedInterceptors?: InterceptorConfig[];
  initializationTime?: number;
}
