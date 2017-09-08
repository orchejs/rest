import { PropertyUnit } from '../interfaces/property-unit';
import { PropertyDetails } from '../interfaces/property-details';
import { PropertyConfig } from '../interfaces/property-config';
import { ClassUtils } from '../utils/class.utils';

export class PropertyLoader {
  private static propertyConfigs: PropertyConfig[] = [];

  static addProperty(
    target: any,
    propertyKey: string,
    details: PropertyDetails
  ) {
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
}
