import { expect } from 'chai';

import { DecoratorLoader } from '../../lib/loaders/decorator.loader';
import * as path from 'path';
import { PathUtils } from '../../lib/utils/path.utils';

describe('DecoratorLoader', () => {
  describe('#loadDecorators', () => {
    const appRoot = PathUtils.appRoot;

    before(() => {
      PathUtils.appRoot = path.join(appRoot, 'test', 'sandbox', 'fakedir');
    });

    after(() => {
      PathUtils.appRoot = appRoot;
    });

    it('Should return error if no routes where found', async () => {
      try {
        const decoratorLoader = new DecoratorLoader();
        const listOfFiles: string[] = await decoratorLoader.loadDecorators();
        expect(listOfFiles).to.be.null;  
      } catch (e) {
        expect(e).to.be.equal('No Path, Interceptor or Error decorators found!');
      }
    });

    it('Should return error if no path was informed', async () => {
      try {
        PathUtils.appRoot = null;
        const decoratorLoader = new DecoratorLoader();
        const listOfFiles: string[] = await decoratorLoader.loadDecorators();
        expect(listOfFiles).to.be.null;  
      } catch (e) {
        expect(e).to.be.equal('The path must be informed to execute the file search!');
      }      
    });
  });
});
