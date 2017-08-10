import { expect } from 'chai';
import * as path from 'path';

import { OrcheNames } from '../../lib/constants/orche-names';
import { OrcheEngines } from '../../lib/constants/orche-engines';
import { Engine } from '../../lib/engines/engine';
import { CompatVersions } from '../../lib/interfaces/compat-versions';
import { PathUtils } from '../../lib/utils/path.utils';

describe('Engine', () => {

  beforeEach(() => {
    process.env.ORCHE_CONFIG = '';
  });

  after(() => {
    process.env.ORCHE_CONFIG = '';
    PathUtils.localConfigFile = path.resolve(PathUtils.appRoot, './'
      .concat(OrcheNames.configFile));
  });

  describe('#constructor', () => {
    it('Should throw error if the version is not compatible', () => {
      let engine: IncompatibleEngine;
      try {
        engine = new IncompatibleEngine();
        expect(engine).to.null;
      } catch (e) {
        expect(e).not.null;
      }
    });

    it('Should load orche configs from env.ORCHE_CONFIG', () => {
      process.env.ORCHE_CONFIG = PathUtils.localConfigFile;

      let engine: SpecEngine;
      try {
        engine = new SpecEngine();
        expect(engine).not.null;
      } catch (e) {
        expect(e).to.be.null;
      }
    });

    it('Should load orche configs, following the hierarchy', () => {
      let engine: SpecEngine;
      try {
        engine = new SpecEngine();
        expect(engine).not.null;
      } catch (e) {
        expect(e).to.be.null;
      }
    });

    it('Should throw error if the env.ORCHE_CONFIG file is wrong', () => {
      process.env.ORCHE_CONFIG = path.resolve(PathUtils.appRoot, 'LICENSE');

      let engine: SpecEngine;
      try {
        engine = new SpecEngine();
        expect(engine).to.be.null;
      } catch (e) {
        expect(e).not.null;
      }
    });

    it('Should throw error if the env.ORCHE_CONFIG file was informed but not found', () => {
      process.env.ORCHE_CONFIG = path.resolve(PathUtils.appRoot, 'not-a-existent-file.json');

      let engine: SpecEngine;
      try {
        engine = new SpecEngine();
        expect(engine).to.be.null;
      } catch (e) {
        expect(e).not.null;
      }
    });

    it('Should throw error if the local ORCHE_CONFIG file is wrong', () => {
      PathUtils.localConfigFile = path.resolve(PathUtils.appRoot, 'LICENSE');

      let engine: SpecEngine;
      try {
        engine = new SpecEngine();
        expect(engine).to.be.null;
      } catch (e) {
        expect(e).not.null;
      }
    });
  });
});

/**
 * Engine with a not supported version.
 */
class IncompatibleEngine extends Engine {
  constructor() {
    super(
      {
        dependency: 'express',
        from: '1.0.0',
        to: '1.1.0',
      },
    );
  }

  public loadServer(): Promise<any> {
    throw new Error('Not implemented. Doen\'t matter for these tests');
  }
  protected setupSettings(): void {
    throw new Error('Not implemented. Doen\'t matter for these tests');
  }
  protected setupExtensions(): void {
    throw new Error('Not implemented. Doen\'t matter for these tests');
  }
}

/**
 * Version is compatible. It will test all engine 
 * generic methods.
 */
class SpecEngine extends Engine {
  constructor() {
    super(
      {
        dependency: 'express',
        from: '1.0.0',
        to: '5.0.0',
      },
      {
        path: '/myapp',
        extensions: [],
        settings: {},
        corsConfig: {
          origin: '*',
        },
      });
  }

  public loadServer(): Promise<any> {
    throw new Error('Not implemented. Doen\'t matter for these tests');
  }
  protected setupSettings(): void {
    throw new Error('Not implemented. Doen\'t matter for these tests');
  }
  protected setupExtensions(): void {
    throw new Error('Not implemented. Doen\'t matter for these tests');
  }
}
