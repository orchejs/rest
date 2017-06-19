import * as fs from 'fs';
import { EventEmitter } from 'events';

import { OrcheEngines } from '../constants/orche-engines';
import { OrcheConfig } from '../interfaces/orche-config';
import { CompatVersions } from '../interfaces/compat-versions';
import { PackageUtils } from '../utils/package.utils';
import { PathUtils } from '../utils/path.utils';


export abstract class Engine {

  protected app: any;
  protected server: any;
  protected config: OrcheConfig;
  protected abstract compatVersions: CompatVersions;

  constructor(userConfig?: OrcheConfig) {
    const isCompatible = this.isEngineVersionSupported();

    if (!isCompatible) {
      throw new Error(`Engine version not supported. For ${this.compatVersions.dependency}
      you should use a version from ${this.compatVersions.from} to ${this.compatVersions.to}`);
    }

    this.loadOrcheConfig(userConfig);
  }

  protected isEngineVersionSupported(): boolean {
    const pUtils: PackageUtils = new PackageUtils();
    
    return pUtils.isDependencyVersionCompatible(this.compatVersions.dependency, 
                                                this.compatVersions.from, 
                                                this.compatVersions.to);
  }

  /**
   * Priority hierarchy:
   * 1 - User configs
   * 2 - System variable ORCHE_CONFIG
   * 3 - App .orcherc
   * load .orcherc local or SYSTEM VARIABLE
   */
  protected loadOrcheConfig(appCfg?: OrcheConfig): void {
    const configAppFileName = appCfg.appName || PathUtils.appDirName;

    let envCfg;
    if (process.env.ORCHE_CONFIG) {
      const fileContent = fs.readFileSync(process.env.ORCHE_CONFIG, 'utf8');
      envCfg = fileContent[configAppFileName];
    }

    let localCfg;
    if (PathUtils.localConfigFile) {
      const fileContent = fs.readFileSync(PathUtils.localConfigFile, 'utf8');
      localCfg = fileContent;
    }

    /*
     * Config's merge, following this priority:
     * 1 - ENV's orche file configuration
     * 2 - LOCAL's orche file configuration
     * 3 - code orche config
     */
    appCfg.apiEngine = envCfg.apiEngine || localCfg.apiEngine || appCfg.apiEngine ||
      OrcheEngines.ExpressJS;
      
    appCfg.port = envCfg.port || localCfg.port || appCfg.port || 3000;

    const path = envCfg.path || localCfg.path || appCfg.path;
    appCfg.path = PathUtils.urlSanitation(path);

    appCfg.appName = envCfg.appName || localCfg.appName || appCfg.appName || PathUtils.appDirName;

    appCfg.corsConfig = envCfg.corsConfig || localCfg.corsConfig || appCfg.corsConfig;

    appCfg.debug = envCfg.debug || localCfg.debug || appCfg.debug || false;

    appCfg.extensions = envCfg.extensions || localCfg.extensions || appCfg.extensions;

    appCfg.initMessage = envCfg.initMessage || localCfg.initMessage || appCfg.initMessage;

    appCfg.settings = envCfg.settings || localCfg.settings || appCfg.settings;

    this.config = appCfg;
  }

  public abstract loadServer(): Promise<any>;
  protected abstract setupSettings(): void;
  protected abstract setupExtensions(): void;

}
