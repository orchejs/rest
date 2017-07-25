import { InterceptorType } from '../constants/interceptor-type';

export interface InterceptorUnit {
  method: any;
  methodName?: string;
  type: InterceptorType;
}
