/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { EventEmitter } from 'events';
import * as fs from 'fs';

import { PathUtils, UrlUtils, logger } from '@orchejs/common';
import { OrcheRestConfig } from '../interfaces';
import { OrcheEngine } from '../constants';

export class ConfigUtils extends EventEmitter {
  config: OrcheRestConfig;

  constructor() {
    super();
    this.setMaxListeners(50);
    this.loadOrcheConfig();
  }

  /**
   * Priority hierarchy:
   * 1 - User configs
   * 2 - System variable ORCHE_CONFIG
   * 3 - App .orcherc
   * load .orcherc local or SYSTEM VARIABLE
   */
  loadOrcheConfig(userConfig: OrcheRestConfig = {}): void {
    this.config = {};
    const configAppFileName = userConfig.appName || PathUtils.appDirName;

    // Loads the environment orche config file contents
    const envCfg: OrcheRestConfig = this.loadEnvConfigFile(configAppFileName);
    // Load's the local orche config file contents
    const localCfg: OrcheRestConfig = this.loadLocalConfigFile();

    /*
     * Config's merge, following this priority:
     * 1 - ENV's orche file configuration
     * 2 - LOCAL's orche file configuration
     * 3 - code orche config
     */
    this.config.apiEngine =
      envCfg.apiEngine || localCfg.apiEngine || userConfig.apiEngine || OrcheEngine.ExpressJS;

    const path = envCfg.path || localCfg.path || userConfig.path;
    this.config.path = UrlUtils.urlSanitation(path);

    this.config.port = envCfg.port || localCfg.port || userConfig.port || 3000;
    this.config.appName =
      envCfg.appName || localCfg.appName || userConfig.appName || PathUtils.appDirName;
    this.config.corsConfig = envCfg.corsConfig || localCfg.corsConfig || userConfig.corsConfig;
    this.config.debug = envCfg.debug || localCfg.debug || userConfig.debug || false;
    this.config.middlewares = envCfg.middlewares || localCfg.middlewares || userConfig.middlewares;
    this.config.settings = envCfg.settings || localCfg.settings || userConfig.settings;

    this.emit('configLoaded', this.config);
  }

  private loadEnvConfigFile(configAppFileName: string): OrcheRestConfig {
    let envCfg: OrcheRestConfig = {};
    if (process.env.ORCHE_CONFIG && process.env.ORCHE_CONFIG !== '') {
      const envConfigFile = fs.existsSync(process.env.ORCHE_CONFIG);
      if (envConfigFile) {
        try {
          let fileContent: any = fs.readFileSync(process.env.ORCHE_CONFIG, 'utf8');

          if (fileContent) {
            fileContent = JSON.parse(fileContent);
            envCfg = fileContent['apps'] ? fileContent['apps'][configAppFileName] : {};
            logger.debug(`Orche's environment config file loaded. 
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

  private loadLocalConfigFile(): OrcheRestConfig {
    let localCfg: OrcheRestConfig = {};
    const localConfigFile = fs.existsSync(PathUtils.localConfigFile);
    if (localConfigFile) {
      try {
        const fileContent = fs.readFileSync(PathUtils.localConfigFile, 'utf8');
        if (fileContent) {
          localCfg = JSON.parse(fileContent);
          logger.debug(`Orche's local config file loaded. 
            File: ${process.env.ORCHE_CONFIG}`);
        }
      } catch (error) {
        throw new Error(`Orche's local config file could not be loaded. Error: ${error.stack}`);
      }
    }
    return localCfg;
  }
}

export const configUtils: ConfigUtils = new ConfigUtils();
export let appConfig = configUtils.config;

configUtils.on('configLoaded', (config: OrcheRestConfig) => {
  appConfig = config;
});
