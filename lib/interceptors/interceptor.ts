import { InterceptorType } from '../constants/interceptor-type';
import { InterceptorConfig } from '../interfaces/interceptor-config';

export abstract class Interceptor {

  protected abstract loadPreProcessors(app: any): Promise<any>;

  protected abstract loadPostProcessors(app: any): Promise<any>;

  protected abstract loadInterceptorUnit(app: any, interceptorType: InterceptorType): 
    InterceptorConfig[];
}
