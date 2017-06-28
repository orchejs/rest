import { LoadRouterStats } from './load-router-stats';
import { LoadInterceptorStats } from './load-interceptor-stats';

export interface LoadStats {

  routerStats?: LoadRouterStats;
  interceptorStats?: LoadInterceptorStats;

}
