import { InterceptorConfig } from '../interfaces/interceptor-config';
import { LoadInterceptorStats } from '../interfaces/load-interceptor-stats';

export abstract class Interceptor {

  protected app: any;

  constructor(app: any) {
    this.app = app;
  }

  public abstract loadProcessors(): Promise<LoadInterceptorStats>;

  public abstract loadInterceptorUnit(): InterceptorConfig[];
}
