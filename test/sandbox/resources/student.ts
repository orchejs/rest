import { NotNullValidator, property } from '../../..';
// import { NullValidator } from '@orche/validators';

export class Student {
  @property({
    alias: 'name',
    validator: {
      validator: NotNullValidator
    }
  })
  private _name: string;

  constructor(name?: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }
  
  set name(name: string) {
    this._name = name;
  }
}
