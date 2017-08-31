import { ValidatorLoader } from '../loaders/validator.loader';
import { ValidatorDetails } from '../interfaces/validator-details';

export function validate(validator: ValidatorDetails) {
  return ValidatorLoader.addValidator(validator);
}
