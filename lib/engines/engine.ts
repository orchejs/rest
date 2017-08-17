import { OrcheConfig } from '../interfaces/orche-config';
import { OrcheResult } from '../interfaces/orche-result';
import { LoadStats } from '../interfaces/load-stats';
import { CompatVersions } from '../interfaces/compat-versions';
import { PackageUtils } from '../utils/package.utils';
import { configUtils } from '../utils/config.utils';


export abstract class Engine {

  protected app: any;
  protected server: any;
  protected config: OrcheConfig;

  constructor(compatVersions: CompatVersions, userConfig?: OrcheConfig) {
    const isCompatible = this.isEngineVersionSupported(compatVersions);

    if (!isCompatible) {
      throw new Error(`Engine version not supported. For ${compatVersions.dependency}
      you should use a version from ${compatVersions.from} to ${compatVersions.to}`);
    }

    configUtils.loadOrcheConfig(userConfig);
    this.config = configUtils.config;
  }

  private isEngineVersionSupported(compatVersions: CompatVersions): boolean {
    const pUtils: PackageUtils = new PackageUtils();

    return pUtils.isDependencyVersionCompatible(
      compatVersions.dependency,
      compatVersions.from,
      compatVersions.to);
  }


  public abstract loadServer(): Promise<OrcheResult>;
  protected abstract setupSettings(): void;
  protected abstract setupExtensions(): void;

}
