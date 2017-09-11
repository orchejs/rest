import { ValidatorError } from '../interfaces/validator-error';
import { ValidatorDetails } from '../interfaces/validator-details';

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
      validatorResponse = await validator.validate(validatorDetails.parameters);
      if (validatorResponse) {
        validatorResponse.property = propertyKey;
      }
      resolve(validatorResponse);
    });
  }
}
