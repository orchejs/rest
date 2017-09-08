import { error } from 'util';
import { BuildObjectResponse } from '../interfaces/build-object-response';
import { ValidatorResponse } from '../interfaces/validator-response';
import { ValidatorRunner } from '../validators/validator-runner';
import { ValidatorDetails } from '../interfaces/validator-details';
import { ClassUtils } from '../utils/class.utils';
import { PropertyUnit } from '../interfaces/property-unit';
import { PropertyLoader } from '../loaders/property.loader';
import { BodyParamDetails } from '../interfaces/body-param-details';

export class Properties {

  static loadPropertiesFromObject(
    value: any,
    param: BodyParamDetails
  ): Promise<BuildObjectResponse> {
    const clazz: object = param.convertTO;
    if (!clazz) {
      // TODO what is the proper behaviour to this situation
      return;
    }
    const className = ClassUtils.getClassName(param.convertTO);
    const propertyUnits: PropertyUnit[] = PropertyLoader.getProperties(className);

    return this.buildObject(value, clazz, propertyUnits);
  }

  private static buildObject(
    value: any,
    clazz: object,
    propertyUnits: PropertyUnit[]
  ): Promise<BuildObjectResponse> {
    let response: BuildObjectResponse;
    const validatorResponses: ValidatorResponse[] = [];
    
    return new Promise((resolve, reject) => {
      try {
        const object = Object.create(clazz);
        propertyUnits.forEach(async (unit) => {
          const details = unit.details;
          if (!details.alias) {
            details.alias = unit.propertyKey;
          }
          const propValue = value[details.alias];
          object[unit.propertyKey] = propValue;
    
          const validatorDetails: ValidatorDetails = details.validator;
          if (validatorDetails) {
            const valResponse: ValidatorResponse = await ValidatorRunner.validateObject(
              propValue,
              unit.propertyKey,
              validatorDetails
            );
    
            if (!valResponse.success) {
              validatorResponses.push(valResponse);
            }
          }
        });
        response = {
          object,
          validatorResponses
        };
        resolve(response);
      } catch (error) {
        reject('An error happened during object creation');
      }
    });
  }
}
