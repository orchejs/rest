import { expect } from 'chai';
import { PathUtils } from '@orchejs/common';
import { ConfigUtils } from '../..';

describe('ConfigUtils', () => {
  describe('#loadOrcheConfig', () => {
    let configUtils: ConfigUtils;

    beforeEach(() => {
      configUtils = new ConfigUtils();
    });

    it('Should load config with default options', () => {
      configUtils.loadOrcheConfig();
      expect(configUtils.config).to.be.not.undefined;
    });

    it('Should load config with using values from .orcherc from project', () => {
      configUtils.loadOrcheConfig();
      expect(configUtils.config.appName).to.be.equal('cool APIs');
    });

    it('Should load config with using values from .orcherc from process.ENV', () => {
      process.env.ORCHE_CONFIG = PathUtils.localConfigFile;
      configUtils.loadOrcheConfig();
      expect(configUtils.config.appName).to.be.equal('cool APIs');
    });

    it('Should try to load an orcherc file that does not exists from process.ENV', () => {
      process.env.ORCHE_CONFIG = '/unknown-location/.orcherc';
      try {
        configUtils.loadOrcheConfig();
      } catch (error) {
        expect(error).to.be.not.undefined;
      }
    });    
  });
});
