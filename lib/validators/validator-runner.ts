import { ValidatorResponse } from '../interfaces/validator-response';
import { ValidatorDetails } from '../interfaces/validator-details';
import { ValidatorLoader } from '../loaders/validator.loader';

export class ValidatorRunner {
  
  /**
   * 
   * @return validation response with a boolean status and error details if existent. 
   */
  static validateObject(
    value: any,
    propertyKey: string,
    validatorDetails: ValidatorDetails
  ): Promise<ValidatorResponse> {
    return new Promise(async (resolve, reject) => {
      let validatorResponse: ValidatorResponse = { success: true };
      if (!validatorDetails || !validatorDetails.validator) {
        Promise.resolve(validatorResponse);
        return;
      }

      const validator = new (validatorDetails.validator)();
      validatorResponse = await validator.validate(validatorDetails.parameters);
      validatorResponse.property = propertyKey;
      resolve(validatorResponse);
    });
  }
}
