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
  });
});
