/**
 * @license
 * Copyright Mauricio Gemelli Vigolo.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { OrcheRestConfig, OrcheRestResult } from '../interfaces';
import { CompatVersions, PackageUtils, logger } from '@orchejs/common';
import { configUtils } from '../utils';

export abstract class Engine {
  protected app: any;
  protected server: any;
  protected config: OrcheRestConfig;

  constructor(compatVersions: CompatVersions, userConfig?: OrcheRestConfig) {
    const isCompatible = this.isEngineVersionSupported(compatVersions);

    if (!isCompatible) {
      throw new Error(`Engine version not supported. For ${compatVersions.dependency}
      you should use a version from ${compatVersions.from} to ${compatVersions.to}`);
    }

    configUtils.loadOrcheConfig(userConfig);
    this.config = configUtils.config;

    logger.init(this.config.logOptions, this.config.environment, this.config.debug);
  }

  private isEngineVersionSupported(compatVersions: CompatVersions): boolean {
    const pUtils: PackageUtils = new PackageUtils();

    return pUtils.isDependencyVersionCompatible(
      compatVersions.dependency,
      compatVersions.from,
      compatVersions.to
    );
  }

  public abstract loadServer(): Promise<OrcheRestResult>;
  protected abstract setupSettings(): void;
  protected abstract setupExtensions(): void;
}
