import { HttpResponseCode } from '../constants/http-response-code';

/**
 * 
 * @param {any} validator class that will execute the validation. Must inherits from Validator
 * @param {any} parameters parameters that will be passed to the validation, like max and min values
 * @param {string} customMessage if you would like to customize the message that will be replied in 
 *                               case of an unmet validation. In case of an undefined value, it will
 *                               send the default message
 */
export interface ValidatorDetails {
  validator: any;
  parameters?: any;
  customMessage?: string;
}
