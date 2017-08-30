import { Validator } from './validator';

export class NullValidator extends Validator {

  constructor() {
    super();
  }

  public validate(): any {
    throw new Error('Not implemented yet.');
  }
}
