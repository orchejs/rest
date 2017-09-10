import { Validator } from '../validator';

export class EmailValidator extends Validator {

  constructor() {
    super();
  }

  public validate(): any {
    throw new Error('Not implemented yet.');
  }
}
