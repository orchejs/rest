import { ValidatorUtils } from '../utils/validator.utils';
import { BodyParamDetails } from '../interfaces/body-param-details';
import { PropertyUnit } from '../interfaces/property-unit';
import { PropertyDetails } from '../interfaces/property-details';
import { PropertyConfig } from '../interfaces/property-config';
import { ClassUtils } from '../utils/class.utils';
import { BuildObjectResponse } from '../interfaces/build-object-response';
import { ValidatorError } from '../interfaces/validator-error';
import { ValidatorDetails } from '../interfaces/validator-details';

export class PropertyLoader {
  private static propertyConfigs: PropertyConfig[] = [];

  static addProperty(target: any, propertyKey: string, details: PropertyDetails) {
    const className = ClassUtils.getClassName(target.constructor);
    if (!className) {
      return;
    }
    const propertyUnit: PropertyUnit = {
      details,
      propertyKey
    };

    let propertyConfig: PropertyConfig = this.propertyConfigs.find(
      validator => validator.className === className
    );

    if (!propertyConfig) {
      propertyConfig = {
        className,
        units: [propertyUnit]
      };
      this.propertyConfigs.push(propertyConfig);
    } else {
      propertyConfig.units.push(propertyUnit);
    }
  }

  static getProperties(className: string): PropertyUnit[] {
    const propertyConfig: PropertyConfig = this.propertyConfigs.find(
      validator => validator.className === className
    );

    return propertyConfig.units;
  }

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
    const validatorErrors: ValidatorError[] = [];

    return new Promise((resolve, reject) => {
      try {
        const object = Object.create(clazz);
        propertyUnits.forEach(async unit => {
          const details = unit.details;
          if (!details.alias) {
            details.alias = unit.propertyKey;
          }

          const propValue = value[details.alias] || value[unit.propertyKey];
          object[unit.propertyKey] = propValue;

          const validatorDetails: ValidatorDetails = details.validator;
          if (validatorDetails) {
            const valResponse: ValidatorError = await ValidatorUtils.validateObject(
              propValue,
              unit.propertyKey,
              validatorDetails
            );

            if (valResponse) {
              validatorErrors.push(valResponse);
            }
          }
        });
        response = {
          object,
          validatorErrors
        };
        resolve(response);
      } catch (error) {
        reject('An error happened during object creation');
      }
    });
  }
}
