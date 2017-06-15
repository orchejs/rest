import { InterceptorType } from '../constants/interceptor-type';
import { InterceptorConfig } from '../interfaces/interceptor-config';

export abstract class Interceptor {

  protected app: any;

  constructor(app: any) {
    this.app = app;
  }

  public abstract loadPreProcessors(): Promise<any>;

  public abstract loadPostProcessors(): Promise<any>;

  public abstract loadInterceptorUnit(interceptorType: InterceptorType): InterceptorConfig[];
}
