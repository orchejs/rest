import { SortType } from '../../lib/constants/sorttype';
import { expect } from 'chai';
import * as path from 'path';
import { PathUtils } from '../../lib/utils/path.utils';

describe('PathUtils', () => {
  
  describe('appRoot', () => {
    it('Should return the root of the app', () => {
      const appRoot = path.resolve(__dirname, '../../');
      expect(PathUtils.appRoot).to.be.equal(appRoot);
    });
  });
  
  describe('appDirName', () => {
    it('Should return the project directory name', () => {
      expect(PathUtils.appDirName).to.be.equal('core');
    });
  });

  describe('localConfigFile', () => {
    it('Should return the project\'s directory with the .orcherc file', () => {
      const localConfigFile = path.join(path.resolve(__dirname, '../../'), '/.orcherc');
      expect(PathUtils.localConfigFile).to.be.equal(localConfigFile);
    });
  });

  describe('#urlSanitation', () => {
    it('Should return the same value, if the value parameter is already fine', () => {
      const result = PathUtils.urlSanitation('/test');
      expect(result).to.be.equal('/test');
    });

    it('Should return / if the value parameter is null', () => {
      const result = PathUtils.urlSanitation(null);
      expect(result).to.be.equal('/');
    });

    it('Should return / if the value parameter is \'\'', () => {
      const result = PathUtils.urlSanitation('');
      expect(result).to.be.equal('/');
    });    

    it('Should return / if the value parameter is /', () => {
      const result = PathUtils.urlSanitation('/');
      expect(result).to.be.equal('/');
    });
  
    it('Should return /test if there isn\'t backslashed', () => {
      const result = PathUtils.urlSanitation('test');
      expect(result).to.be.equal('/test');
    });

    it('Should remove the / in the end of the path, if there is a backslash', () => {
      const result = PathUtils.urlSanitation('test/');
      expect(result).to.be.equal('/test');
    });
  });

  describe('#getPathValue', () => {
    it('Should return null if the value param is null', () => {
      const result = PathUtils.getPathValue(null);
      expect(result).to.be.null;
    });

    it('Should return an array if the value contains comma', () => {
      const result = PathUtils.getPathValue('test,test2,test3');
      expect(result).to.be.length(3);
    }); 
    
    it('Should return the value if it just a regular value', () => {
      const result = PathUtils.getPathValue('test');
      expect(result).to.be.equal('test');
    });

    it('Should return a SortType Ascending if the value has +', () => {
      const result = JSON.stringify(PathUtils.getPathValue('+test'));
      expect(result).to.be.equal('{"name":"test","type":0}');
    });

    it('Should return a SortType Descending if the value has -', () => {
      const result = JSON.stringify(PathUtils.getPathValue('test-'));
      expect(result).to.be.equal('{"name":"test","type":1}');
    });
  });
});
