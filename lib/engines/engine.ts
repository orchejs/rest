import * as fs from 'fs';
import { EventEmitter } from 'events';

import { OrcheEngines } from '../constants/orche-engines';
import { OrcheConfig } from '../interfaces/orche-config';
import { LoadStats } from '../interfaces/load-stats';
import { CompatVersions } from '../interfaces/compat-versions';
import { PackageUtils } from '../utils/package.utils';
import { PathUtils } from '../utils/path.utils';
import { LogUtils } from '../utils/log.utils';


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

    this.loadOrcheConfig(userConfig);
  }

  private isEngineVersionSupported(compatVersions: CompatVersions): boolean {
    const pUtils: PackageUtils = new PackageUtils();

    return pUtils.isDependencyVersionCompatible(
      compatVersions.dependency,
      compatVersions.from,
      compatVersions.to);
  }

  /**
   * Priority hierarchy:
   * 1 - User configs
   * 2 - System variable ORCHE_CONFIG
   * 3 - App .orcherc
   * load .orcherc local or SYSTEM VARIABLE
   */
  private loadOrcheConfig(appCfg: OrcheConfig = {}): void {
    const configAppFileName = appCfg.appName || PathUtils.appDirName;

    // Loads the environment orche config file contents
    const envCfg: OrcheConfig = this.loadEnvConfigFile(configAppFileName);
    // Load's the local orche config file contents
    const localCfg: OrcheConfig = this.loadLocalConfigFile();

    /*
     * Config's merge, following this priority:
     * 1 - ENV's orche file configuration
     * 2 - LOCAL's orche file configuration
     * 3 - code orche config
     */
    this.config.apiEngine = envCfg.apiEngine || localCfg.apiEngine || appCfg.apiEngine ||
      OrcheEngines.ExpressJS;

    const path = envCfg.path || localCfg.path || appCfg.path;
    this.config.path = PathUtils.urlSanitation(path);

    this.config.port = envCfg.port || localCfg.port || appCfg.port || 3000;
    this.config.appName = envCfg.appName || localCfg.appName || appCfg.appName || 
      PathUtils.appDirName;
    this.config.corsConfig = envCfg.corsConfig || localCfg.corsConfig || appCfg.corsConfig;
    this.config.debug = envCfg.debug || localCfg.debug || appCfg.debug || false;
    this.config.extensions = envCfg.extensions || localCfg.extensions || appCfg.extensions;
    this.config.settings = envCfg.settings || localCfg.settings || appCfg.settings;
  }

  private loadEnvConfigFile(configAppFileName: string): OrcheConfig {
    let envCfg: OrcheConfig = {};
    if (process.env.ORCHE_CONFIG && process.env.ORCHE_CONFIG !== '') {
      const envConfigFile = fs.existsSync(process.env.ORCHE_CONFIG);
      if (envConfigFile) {
        try {
          let fileContent = fs.readFileSync(process.env.ORCHE_CONFIG, 'utf8');

          if (fileContent) {
            fileContent = JSON.parse(fileContent);
            envCfg = fileContent['apps'][configAppFileName];
            LogUtils.debug(`Orche's environment config file loaded. 
              File: ${process.env.ORCHE_CONFIG}`);
          }
        } catch (error) {
          throw new Error(`Orche's environment config file could not be loaded. Error: 
            ${error.stack}`);
        }
      } else {
        throw new Error(`Orche's environment config file not found. File: 
          ${process.env.ORCHE_CONFIG}`);
      }
    }
    return envCfg;
  }

  private loadLocalConfigFile(): OrcheConfig {  
    let localCfg: OrcheConfig = {};
    const localConfigFile = fs.existsSync(PathUtils.localConfigFile);
    if (localConfigFile) {
      try {
        const fileContent = fs.readFileSync(PathUtils.localConfigFile, 'utf8');
        console.log(PathUtils.localConfigFile);
        if (fileContent) {
          localCfg = JSON.parse(fileContent);
          LogUtils.debug(`Orche's local config file loaded. 
            File: ${process.env.ORCHE_CONFIG}`);
        }
      } catch (error) {
        throw new Error(`Orche's local config file could not be loaded. Error: ${error.stack}`);
      }
    }
    return localCfg;
  }

  public abstract loadServer(): Promise<LoadStats>;
  protected abstract setupSettings(): void;
  protected abstract setupExtensions(): void;

}
