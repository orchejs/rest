import { ValidatorDetails } from './validator-details';

export interface ParamDetails {
  name: string;
  type?: any;
  validators?: ValidatorDetails[];
  format?: string;
}
