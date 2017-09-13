import { OrcheRestConfig, OrcheRestResult } from '../interfaces';
import { CompatVersions } from '../interfaces/compat-versions';
import { PackageUtils } from '../utils/package.utils';
import { configUtils } from '../utils/config.utils';
import { logger } from '../utils/log.utils';

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

    logger.init(this.config);
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
