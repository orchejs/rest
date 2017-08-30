import 'reflect-metadata';

const validateMetadataKey = Symbol('validate');

export function validate(validator: ValidatorDetails) {
  return Reflect.metadata(validateMetadataKey, validator);
}

export function getValidator(target: any, propertyKey: string) {
  return Reflect.getMetadata(validateMetadataKey, target, propertyKey);
}
