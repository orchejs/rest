import { SortType } from '../constants/sort-type';
import { SortField } from '../interfaces/sort-field';

export class UrlUtils {
  /**
   * Sanitizes the url, in other words, this function includes the beginning slash
   * and removes the ending slash, if not existent and existent respectively.
   * 
   * @param url
   */
  static urlSanitation(url: string): string {
    let finalUrl = url;

    if (!finalUrl || finalUrl.trim().length === 0) {
      return '/';
    } else if (url.length === 1 && url === '/') {
      return finalUrl;
    }

    // Beginning url sanitation
    if (!finalUrl.match(/^\//)) {
      finalUrl = '/' + finalUrl;
    }
    // Ending url sanitation
    if (finalUrl.match(/\/$/)) {
      finalUrl = finalUrl.substr(0, finalUrl.length - 1);
    }

    return finalUrl;
  }

  /**
   * Returns the value already in the correct way to be processed. 
   * If it corresponds to multiple values - separated by commas, this
   * function returns an array of values. Also deals with + or -, meaning
   * a sort type: ascendant and descendant respectively. 
   * 
   * @param value 
   */
  static getPathValue(value: string): any {
    if (!value) {
      return null;
    }

    let result: any;
    if (value.indexOf(',') > -1) {
      const values = value.split(',');

      result = [];
      values.forEach(val => {
        result.push(this.prepareValue(val));
      });

      return result;
    }

    result = this.prepareValue(value);
    return result;
  }

  /**
   * Prepare value, checking if it is a sort field or
   * just a value.
   * 
   * @param value 
   */
  private static prepareValue(value: string): any {
    const length = value.length - 1;
    const asc = value.indexOf('+');
    if (asc === 0 || asc === length) {
      const val = value.replace(/(\+|\-)/g, '');
      return {
        name: val,
        type: SortType.Asc
      };
    }

    const desc = value.indexOf('-');
    if (desc === 0 || desc === length) {
      const val = value.replace(/(\-)/, '');
      return {
        name: val,
        type: SortType.Desc
      };
    }

    return value;
  }
}
