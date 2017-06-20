import { expect } from 'chai';

import { Engine } from '../../lib/engines/engine';
import { OrcheEngines } from '../../lib/constants/orche-engines';
import { CompatVersions } from '../../lib/interfaces/compat-versions';
import { PathUtils } from '../../lib/utils/path.utils';

describe('Engine', () => {
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
      throw new Error('Not implemented');
    }
    protected setupSettings(): void {
      throw new Error('Not implemented');
    }
    protected setupExtensions(): void {
      throw new Error('Not implemented');
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
          initMessage: 'App initialized',
          extensions: [],
          settings: {},
          corsConfig: {
            origin: '*',
          },
        });
    }

    public loadServer(): Promise<any> {
      throw new Error('Not implemented');
    }
    protected setupSettings(): void {
      throw new Error('Not implemented');
    }
    protected setupExtensions(): void {
      throw new Error('Not implemented');
    }
  }

  describe('#constructor', () => {
    it('Should throw error if the version is not compatible', () => {
      let engine: IncompatibleEngine;
      try {
        engine = new IncompatibleEngine();
        expect(engine).to.null;
      } catch (e) {
        expect(e).to.not.null;
      }
    });

    it('Should load orche configs from env.ORCHE_CONFIG', () => {
      process.env.ORCHE_CONFIG = PathUtils.localConfigFile;
      
      let engine: SpecEngine;
      try {
        engine = new SpecEngine();
        expect(engine).to.not.null;
      } catch (e) {
        console.log(e);
        expect(e).to.null;
      }      
    });

    it('Should load orche configs, following the hierarchy', () => {
      let engine: SpecEngine;
      try {
        engine = new SpecEngine();
        expect(engine).to.not.null;
      } catch (e) {
        expect(e).to.null;
      }
    });

    it('Should throw error if the env.ORCHE_CONFIG file is wrong', () => {
      process.env.ORCHE_CONFIG = PathUtils.localConfigFile;
      
      let engine: SpecEngine;
      try {
        engine = new SpecEngine();
        expect(engine).to.not.null;
      } catch (e) {
        console.log(e);
        expect(e).to.null;
      }      
    });        
  });
});
