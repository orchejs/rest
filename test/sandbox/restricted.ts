import { path, get, headerParam } from '../../';

@path('/restricted')
class Restricted {

  @get()
  returnRestrictedData(@headerParam('Authorization') auth): any {
    const result: any = { authorization: auth };
    return result;
  }

}
