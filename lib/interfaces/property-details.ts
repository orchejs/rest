import { ValidatorDetails } from './validator-details';

export interface PropertyDetails {
  alias?: string;
  format?: string;
  validators?: ValidatorDetails[];
}
