import { ValidatorError } from './validator-error';

export interface BuildObjectResponse {
  object: any;
  validatorErrors?: ValidatorError[];
}
