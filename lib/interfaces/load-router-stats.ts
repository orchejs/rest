import { RouterConfig } from './router-config';

export interface LoadRouterStats {
  loadedRoutes?: RouterConfig[];
  initializationTime?: number;
}
