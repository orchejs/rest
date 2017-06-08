import { PackageUtils } from '../../lib/utils/package.utils';

describe('PackageUtils', () => {
  let pkgUtils: PackageUtils;

  before(() => {
    pkgUtils = new PackageUtils();
  });

  describe('#getDescrition', () => {
    it('should return the app description from package.json', () => {
      const description = pkgUtils.getDescrition();

      if (!description) {
        throw new Error(`Expected a description for the app, but was ${description}`);
      }
    });
  });

  describe('#getDependencyVersion', () => {
    it('should return an error if there isn\'t a dependency name', () => {
      try {
        const version = pkgUtils.getDependencyVersion('');
      } catch (e) {
        return;
      }

      throw new Error('Should throw an error if there is no dependency name');
    });

    it('should return a dependency version from dependencies', () => {
      const version = pkgUtils.getDependencyVersion('file-matcher');

      if (!version) {
        throw new Error(`Expected to find the file-matcher version in the dependencies keys but 
          found ${version}`);
      }
    });

    it('should return a dependency version from devDependencies', () => {
      const version = pkgUtils.getDependencyVersion('ts-node');

      if (!version) {
        throw new Error(`Expected to find the ts-node version in the devDependencies keys but 
          found ${version}`);
      }
    });
  });

  describe('#checkDependencyVersion', () => {
    it('should throw error if the dependency was not found', () => {
      let result;
      try {
        result = pkgUtils.checkDependencyVersion('not-a-dependency', '1.0.0');
      } catch (error) {
        return;
      }

      throw new Error(`Should throw an error if the dependency was not found, but returned
        ${result}`);
    });

    it('should return "equal" if the version is the same', () => {
      let result;
      try {
        result = pkgUtils.checkDependencyVersion('file-matcher', '1.1.0');
      } catch (error) {
        return;
      }

      if (result !== 'equal') {
        throw new Error(`Should throw an error if the result is different of equal. The result 
        value is ${result}`);
      }
    });

    it('should return "greater" if the version param is higher than the dependency', () => {
      let result;
      try {
        result = pkgUtils.checkDependencyVersion('file-matcher', '1.2.1');
      } catch (error) {
        return;
      }

      if (result !== 'greater') {
        throw new Error(`Should throw an error if the result is different of greater. The result 
        value is ${result}`);
      }
    });

    it('should return "less" if the version param is lesser than the dependency', () => {
      let result;
      try {
        result = pkgUtils.checkDependencyVersion('file-matcher', '1.0.1');
      } catch (error) {
        return;
      }

      if (result !== 'less') {
        throw new Error(`Should throw an error if the result is different of less. The result 
        value is ${result}`);
      }
    });
  });
});
