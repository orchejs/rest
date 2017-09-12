import { ValidatorError, ValidatorDetails } from '../interfaces';
import { logger } from './';

export class ValidatorUtils {
  static validateObject(
    value: any,
    propertyKey: string,
    ...validators: ValidatorDetails[]
  ): Promise<ValidatorError[]> {
    return new Promise(async (resolve, reject) => {
      const validatorErrors: ValidatorError[] = [];

      if (!validators || validators.length === 0) {
        Promise.resolve(validatorErrors);
        return;
      }

      for (const validatorDetails of validators) {
        if (!validatorDetails.validator) {
          continue;
        }
  
        const validator = new validatorDetails.validator();
        try {
          validatorResponse = await validator.validate(validatorDetails.parameters);
        } catch (error) {
          const msg = 'An error happened during validation.';
          logger.error(msg, {
            value,
            propertyKey,
            exception: error
          });
          reject(msg);
        }
        if (validatorResponse) {
          validatorResponse.property = propertyKey;
        }        
      }

      resolve(validatorResponse);
    });
  }
}
