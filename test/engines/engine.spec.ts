/**
 * @license
 * Copyright Mauricio Gemelli Vigolo and contributors.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { expect } from 'chai';
import { Engine } from '../../lib/engines';
import { CompatVersions } from '@orchejs/common';
import { OrcheRestConfig, OrcheRestResult } from '../../lib/interfaces';

export class MockEngine extends Engine {
  constructor(compatVersions: CompatVersions, userConfig?: OrcheRestConfig) {
    super(compatVersions, userConfig);
  }

  public loadServer(): Promise<OrcheRestResult> {
    throw new Error('Method not implemented.');
  }
  protected setupSettings(): void {
    throw new Error('Method not implemented.');
  }
  protected setupExtensions(): void {
    throw new Error('Method not implemented.');
  }
}

describe('Engine', () => {
  describe('#constructor', () => {
    it('Should result in error as the engine is not supported', () => {
      try {
        const mockEngine = new MockEngine({
          dependency: 'express',
          from: '2.0.0',
          to: '2.5.0'
        });
      } catch (error) {
        expect(error).to.be.not.undefined;
      }
    });
    it('Should load orche configuration if the dependency version is ok', () => {
      try {
        const mockEngine = new MockEngine(
          {
            dependency: 'express',
            from: '2.0.0',
            to: '100.0.0'
          },
          {}
        );
        expect(mockEngine).to.be.not.undefined;
      } catch (error) {
        expect(error).to.be.undefined;
      }
    });
  });
});
