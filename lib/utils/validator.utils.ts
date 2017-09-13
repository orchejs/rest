import { ValidatorError, ValidatorDetails } from '../interfaces';
import { logger } from './';

export class ValidatorUtils {
  static runValidations(
    value: any,
    name: string,
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
        let validatorError: ValidatorError;
        try {
          validatorError = await validator.validate(validatorDetails.parameters);
        } catch (error) {
          const msg = 'An error happened during validation.';
          logger.error(msg, {
            value,
            name,
            exception: error
          });
          reject(msg);
        }
        if (validatorError) {
          validatorError.name = name;
          validatorError.message = validatorDetails.customMessage || validatorError.message;
          validatorErrors.push(validatorError);
        }        
      }

      resolve(validatorErrors);
    });
  }
}
