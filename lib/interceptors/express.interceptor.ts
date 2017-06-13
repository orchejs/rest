import { Interceptor } from './interceptor';

import { InterceptorType } from '../constants/interceptor-type';
import { InterceptorConfig } from '../interfaces/interceptor-config';


export class ExpressInterceptor extends Interceptor {

  protected loadPreProcessors(app: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  protected loadPostProcessors(app: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  protected loadInterceptorUnit(app: any, interceptorType: InterceptorType): InterceptorConfig[] {
    throw new Error('Method not implemented.');
  }

}
