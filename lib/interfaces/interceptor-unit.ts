import { InterceptorType } from '../constants/interceptor-type';

export interface InterceptorUnit {
  classMethod: any;
  type: InterceptorType;
}
