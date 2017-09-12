import * as moment from 'moment';

export class ConverterUtils {
  static convertToType(value: any, type: any, format: string = 'YYYY-MM-DD HH:mm:ss'): any {
    let val: any;

    if (value === undefined || value === null) {
      return value;
    }

    switch (type.name) {
      case 'Number':
        val = +value;
        break;
      case 'String':
        val = String(value);
        break;
      case 'Boolean':
        val = Boolean(value);
        break;
      case 'Symbol':
        val = Symbol(value);
        break;
      case 'Date':
        val = moment(value, format).toDate();
        break;
      case 'Array':
        if (typeof value === 'string') {
          val = value.split(/(;|,|\s|\_)/ig);
        } else {
          val = value;
        }
      default:
        val = value;
    }
    return val;
  }
}
