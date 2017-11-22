/**
 * @license
 * Copyright Mauricio Gemelli Vigolo.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { expect } from 'chai';
import { Route, Get } from '../..';
import { RequestHelper } from '../helpers';

export class ClassicalMusic {
  uuid: string;
  name: string;

  constructor(uuid: string, name: string) {
    this.uuid = uuid;
    this.name = name;
  }
}

@Route()
export class ClassicalMusics {
  @Get()
  list(): ClassicalMusic[] {
    return [
      new ClassicalMusic('123', 'The marriage of Figaro')
    ];
  }
}

describe('Route decorator tests', () => {
  it(
    'Should create an endpoint with Route, using the classname as path, transformed to spinal-case',
    async () => {
      const result = await RequestHelper.get('/orche/classical-musics');
      expect(result).to.be.not.undefined;
    });
});
