import { ValidatorError } from '../interfaces/validator-error';
export abstract class Validator {

  constuctor() {}
  
  abstract validate(...params: any[]): Promise<ValidatorError>;

}
