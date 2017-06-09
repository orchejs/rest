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

    it('should throw error if the version to check is undefined', () => {
      let result;
      try {
        result = pkgUtils.checkDependencyVersion('file-matcher', undefined);
      } catch (error) {
        return;
      }

      throw new Error(`Should throw an error if the version to check is undefined, but returned
        ${result}`);
    });

    it('should throw error if the version to check is null', () => {
      let result;
      try {
        result = pkgUtils.checkDependencyVersion('file-matcher', null);
      } catch (error) {
        return;
      }

      throw new Error(`Should throw an error if the version to check is null, but returned
        ${result}`);
    });

    it('should throw error if the version to check is blank', () => {
      let result;
      try {
        result = pkgUtils.checkDependencyVersion('file-matcher', '');
      } catch (error) {
        return;
      }

      throw new Error(`Should throw an error if the version to check is blank, but returned
        ${result}`);
    });

    it('should throw error if the version to check contains invalid chars', () => {
      let result;
      try {
        result = pkgUtils.checkDependencyVersion('file-matcher', 'asf.sadas');
      } catch (error) {
        return;
      }

      throw new Error(`Should throw an error if the version to check contains invalid chars, but 
       returned ${result}`);
    });

    it('should throw error if the version to check does not follow the semantic versioning', () => {
      let result;
      try {
        result = pkgUtils.checkDependencyVersion('file-matcher', 'asf.2das');
      } catch (error) {
        return;
      }

      throw new Error(`Should throw an error if the version does not follow the SEMVER, but returned
        ${result}`);
    });

    it('should return "eq" if the version is the same', () => {
      let result;
      try {
        result = pkgUtils.checkDependencyVersion('file-matcher', '1.1.0');
      } catch (error) {
        return;
      }

      if (result !== 'eq') {
        throw new Error(`Should throw an error if the result is different of equal. The result 
        value is ${result}`);
      }
    });

    it('should return "gt" if the version param is higher than the dependency', () => {
      let result;
      try {
        result = pkgUtils.checkDependencyVersion('file-matcher', '1.2.1');
      } catch (error) {
        return;
      }

      if (result !== 'gt') {
        throw new Error(`Should throw an error if the result is different of greater. The result 
        value is ${result}`);
      }
    });

    it('should return "lt" if the version param is lesser than the dependency', () => {
      let result;
      try {
        result = pkgUtils.checkDependencyVersion('file-matcher', '1.0.1');
      } catch (error) {
        return;
      }

      if (result !== 'lt') {
        throw new Error(`Should throw an error if the result is different of less. The result 
        value is ${result}`);
      }
    });
  });

  describe('#isDependencyVersionCompatible', () => {
    it('should throw error if the dependency was not found', () => {
      let result;
      try {
        result = pkgUtils.isDependencyVersionCompatible('not-a-dependency', '1.0.0', '1.0.0');
      } catch (error) {
        return;
      }

      throw new Error(`Should throw an error if the dependency was not found, but returned
        ${result}`);
    });

    it('should throw error if the version from or to, to check is not right', () => {
      let result;
      try {
        result = pkgUtils.isDependencyVersionCompatible('file-matcher', undefined, '1;as');
      } catch (error) {
        return;
      }

      throw new Error(`Should throw an error if the version from or to, but returned ${result}`);
    });

    it('should return false if fromVersion is higher than the dependency in package.json', () => {
      let result;
      try {
        result = pkgUtils.isDependencyVersionCompatible('file-matcher', '2.0.0', '2.0.0');
      } catch (error) {
        throw new Error(`Should not throw an exception if the params are right`);
      }

      if (result) {
        throw new Error(`Should return false if the fromVersion is higher, but returned ${result}`);
      }
    });

    it('should return false if toVersion is lesser than the dependency in package.json', () => {
      let result;
      try {
        result = pkgUtils.isDependencyVersionCompatible('file-matcher', '1.0.0', '1.0.1');
      } catch (error) {
        throw new Error(`Should not throw an exception if the params are right`);
      }

      if (result) {
        throw new Error(`Should return false if the toVersion is lesser, but returned ${result}`);
      }
    });

    it(`should return true if fromVersion & toVersion are lesser and greater`, () => {
      let result;
      try {
        result = pkgUtils.isDependencyVersionCompatible('file-matcher', '1.0.0', '2.0.0');
      } catch (error) {
        throw new Error(`Should not throw an exception if the params are right`);
      }

      if (!result) {
        throw new Error(`Should return true if fromVersion & toVersion are lesser and greater, 
        but returned ${result}`);
      }
    });
  });

});
