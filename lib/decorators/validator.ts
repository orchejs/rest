import 'reflect-metadata';
import { ValidatorDetails } from '../interfaces/validator-details';

const validateMetadataKey = Symbol('validate');

export function validate(validator: ValidatorDetails) {
  return Reflect.metadata(validateMetadataKey, validator);
}

export function validators(target: any, propertyKey: string) {
  return Reflect.getMetadata(validateMetadataKey, target, propertyKey);
}
