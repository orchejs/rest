import {
  ParamDetails,
  PropertyUnit,
  PropertyDetails,
  PropertyConfig,
  BuildObjectResponse,
  ValidatorError,
  ValidatorDetails
} from '../interfaces';
import { ValidatorUtils, ClassUtils } from '../utils';

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

  static loadPropertiesFromObject(value: any, param: ParamDetails): Promise<BuildObjectResponse> {
    const clazz: object = param.type as object;
    if (!clazz) {
      // TODO what is the proper behaviour to this situation
      return;
    }
    const className = ClassUtils.getClassName(clazz);
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
