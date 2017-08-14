import { bodyParam, get, headerParam, path, put, requestParam } from '../../';

@path('/restricted')
class Restricted {

  @get()
  returnRestrictedData(@headerParam('Authorization') auth): any {
    const result: any = { authorization: auth };
    return result;
  }
}
