import { Validator } from '../validator';
import { ValidatorError } from '../../interfaces/validator-error';

/**
 * Checks if a value is null or undefined.
 */
export class NotNullValidator extends Validator {
  constructor() {
    super();
  }

  validate(...params: any[]): Promise<ValidatorError> {
    let response: ValidatorError;

    if (!params || params.length < 1 || params[0] === null || params[0] === undefined) {
      response = {
        message: 'Value was null or undefined'
      };
    }

    return Promise.resolve(response);
  }
}
