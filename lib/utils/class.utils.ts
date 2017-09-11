export class ClassUtils {
  static getClassName(obj: object): string {
    if (!obj) {
      return undefined;
    }
    const result = obj.toString().match(/(function|class) ([^{(]*)/i);
    if (!result || result.length < 2) {
      return undefined;
    } else {
      return result[2].trim();
    }
  }
}
