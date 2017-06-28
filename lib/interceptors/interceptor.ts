import { InterceptorType } from '../constants/interceptor-type';
import { InterceptorConfig } from '../interfaces/interceptor-config';
import { LoadInterceptorStats } from '../interfaces/load-interceptor-stats';

export abstract class Interceptor {

  protected app: any;

  constructor(app: any) {
    this.app = app;
  }

  public abstract loadPreProcessors(): Promise<LoadInterceptorStats>;

  public abstract loadPostProcessors(): Promise<LoadInterceptorStats>;

  public abstract loadInterceptorUnit(interceptorType: InterceptorType): InterceptorConfig[];
}
