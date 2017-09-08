import { ValidatorResponse } from './validator-response';

export interface BuildObjectResponse {
  object: any;
  validatorResponses?: ValidatorResponse[];
}
