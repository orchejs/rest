import 'reflect-metadata';
import { ValidatorDetails } from '../interfaces/validator-details';

export class ValidatorLoader {

  private static validateMetadataKey = Symbol('validate');
  
  static addValidator(validator: ValidatorDetails) {
    return Reflect.metadata(this.validateMetadataKey, validator);
  }

  static getValidator(target: any, propertyKey: string) {
    return Reflect.getMetadata(this.validateMetadataKey, target, propertyKey);
  }
    
}
