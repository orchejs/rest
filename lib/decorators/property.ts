import { PropertyLoader } from '../loaders/property.loader';
import { PropertyDetails } from '../interfaces/property-details';

export function property(details: string | PropertyDetails) {
  return (target: any, propertyKey: string) => {
    let propertyDetails: PropertyDetails;

    if (typeof details === 'string') {
      propertyDetails = {
        alias: details
      };
    } else {
      propertyDetails = details;
    }

    PropertyLoader.addProperty(target, propertyKey, propertyDetails);
  };
}
