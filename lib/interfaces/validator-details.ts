import { HttpResponseCode } from '../constants/http-response-code';

export interface ValidatorDetails {
  validator: any;
  parameters?: any;
  customMessage?: string;
  httpStatus?: HttpResponseCode;
}
