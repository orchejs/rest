import { ValidatorError, ValidatorDetails } from '../interfaces';
import { logger } from './';

export class ValidatorUtils {
  static validateObject(
    value: any,
    propertyKey: string,
    validatorDetails: ValidatorDetails
  ): Promise<ValidatorError> {
    return new Promise(async (resolve, reject) => {
      let validatorResponse: ValidatorError = undefined;
      if (!validatorDetails || !validatorDetails.validator) {
        Promise.resolve(validatorResponse);
        return;
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
      resolve(validatorResponse);
    });
  }
}
