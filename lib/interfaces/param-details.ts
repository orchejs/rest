import { BodyParamDetails } from './body-param-details';
import { RegularParamDetails } from './regular-param-details';
export interface ParamDetails {
  details: BodyParamDetails | RegularParamDetails;
}
