/**
 * @license
 * Copyright Mauricio Gemelli Vigolo.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { RequestHelper } from '../helpers';
import { expect } from 'chai';
import { Response } from 'express';
import { PatternValidator, Validator, ValidatorError } from '@orchejs/validators';

import { get, route, queryParam, pathParam, HttpResponseCode, responseParam } from '../..';

const values: any[] = [
  {
    format: 'png',
    name: 'bolivian-walnut',
    size: 22134
  }, 
  {
    format: 'raw',
    name: 'grimmia-dry-rock-moss',
    size: 45065
  },
  {    
    format: 'raw',
    name: 'BABYBONNETS',
    size: 36327
  },
  {    
    format: 'png',
    name: 'harts tonguefern',
    size: 35117
  },
  {    
    format: 'raw',
    name: 'PIGEONBERRY',
    size: 94379
  },
  {    
    format: 'jpg',
    name: 'BOLDO',
    size: 17146
  },
  {    
    format: 'png',
    name: 'PAUPERS-TEA',
    size: 22716
  },
  {    
    format: 'raw',
    name: 'prairie sphagnum',
    size: 29672
  },
  {    
    format: 'raw',
    name: 'african sumac',
    size: 54363
  },
  {    
    format: 'jpg',
    name: 'eugenia',
    size: 69739
  }
];

class ThrowErrorValidator implements Validator {
  validate(value: any, validatorParams?: any): Promise<ValidatorError> {
    throw new Error('Should force a validation error!');
  }
}

@route()
class Pictures {
  @get('', {
    cors: {
      preflight: true,
      corsOptions: {
        origin: '*'
      }
    }
  })
  list(@queryParam('name', {
    validators: [{
      parameters: /[A-Z|0-9]/g,
      validator: PatternValidator
    }]
  }) name: string): any[] {
    return values.filter(picture => picture.name.indexOf(name) > -1);
  }

  @get(':uuid') 
  get(@pathParam('name', {
    validators: [{
      validator: ThrowErrorValidator
    }]
  })name: string): any {
    return values.find(picture => picture.name === name);
  }

  @get(':uuid/actors')
  getActors() {
    throw new Error('An error happened');
  }

  @get(':uuid/actresses')
  getActresses(@responseParam() res: Response) {
    res.status(HttpResponseCode.BadRequest).send('Ops an error happened');
    throw new Error('An error happened');
  }  
}

describe('ExpressRouter', () => {
  describe('#loadRouters', () => {
    it(
      'Should load the route /orche/pictures and list all pictures matching the criteria', 
      async () => {
        const result = await RequestHelper.get('/orche/pictures?name=A');
        expect(result.length).to.be.equal(2);
      });
    
    it(
      'Should return a validation error because name does not follow the validator patterns', 
      async () => {
        const result = await RequestHelper.get('/orche/pictures?name=aw');
        expect(result[0].message).to.be.equal('Pattern wasn\'t fulfilled');
      });
    
    it(
      'Should receive an error because of a wrong validator', 
      async () => {
        const result = await RequestHelper.get('/orche/pictures/aw');
        expect(result).to.be.equal('An error happened during parameter load');
      });

    it(
      'Should deal with errors throwed by endpoints', 
      async () => {
        const result = await RequestHelper.get('/orche/pictures/aw/actors');
        expect(result.message).to.be.equal('An error happened');
      });
    
    it('Should deal with errors and if the response was already sent', async () => {
      const result = await RequestHelper.get('/orche/pictures/aw/actresses');
      expect(result).to.be.equal('Ops an error happened');
    });
  });
});
