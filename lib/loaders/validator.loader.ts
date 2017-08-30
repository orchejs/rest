import 'reflect-metadata';
import { ValidatorDetails } from '../interfaces/validator-details';

export class ValidatorLoader {

  private static validators: any;
  private static validateMetadataKey = Symbol('validate');
  
  static addValidator(validator: ValidatorDetails) {
    
  }
}
