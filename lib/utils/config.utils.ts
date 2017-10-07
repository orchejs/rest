/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { EventEmitter } from 'events';
import * as fs from 'fs';

import { Environment, logger, PathUtils, UrlUtils } from '@orchejs/common';
import { OrcheRestConfig } from '../interfaces';
import { OrcheEngine } from '../constants';

export class ConfigUtils extends EventEmitter {
  config: OrcheRestConfig;

  constructor() {
    super();
    this.setMaxListeners(0);
    this.loadOrcheConfig();
  }

  /**
   * Config's merge, following this priority:
   * - process.env variables
   * - ENV's orche file configuration
   * - LOCAL's orche file configuration
   * - code orche config
   */
  loadOrcheConfig(userConfig: OrcheRestConfig = {}): void {
    this.config = {};

    // App name used in .orcherc configuration files
    const configAppName = userConfig.appName || PathUtils.appDirName;
    // Loads the environment orche config file contents
    const envCfg: OrcheRestConfig = this.loadEnvConfigFile(configAppName);
    // Load's the local orche config file contents
    const localCfg: OrcheRestConfig = this.loadLocalConfigFile();

    // Config merge init
    // API Engine - default Express
    this.config.apiEngine =
      envCfg.apiEngine || localCfg.apiEngine || userConfig.apiEngine || OrcheEngine.ExpressJS;
    // Application main Path - default '/'
    const path = envCfg.path || localCfg.path || userConfig.path;
    this.config.path = UrlUtils.urlSanitation(path);
    // Port - default 3000
    this.config.port = process.env.PORT || envCfg.port || localCfg.port || userConfig.port || 3000;
    // Log options - default undefined
    this.config.logOptions = envCfg.logOptions || localCfg.logOptions || userConfig.logOptions;
    // CORS config - default undefined
    this.config.corsConfig = envCfg.corsConfig || localCfg.corsConfig || userConfig.corsConfig;
    // Debug mode - default false
    this.config.debug = envCfg.debug || localCfg.debug || userConfig.debug || false;
    // Settings - default undefined
    this.config.settings = envCfg.settings || localCfg.settings || userConfig.settings;
    // Base directory - default undefined
    this.config.baseDir = envCfg.baseDir || localCfg.baseDir || userConfig.baseDir;
    // Application name - default app directory name
    this.config.appName = envCfg.appName || localCfg.appName || 
                          userConfig.appName || PathUtils.appDirName;
    // Middlewares - default []
    this.config.middlewares = envCfg.middlewares || localCfg.middlewares || 
                              userConfig.middlewares || [];
    // Environment - default development
    this.config.environment = process.env.ENV || envCfg.environment || 
                              localCfg.environment || userConfig.environment || 
                              'development';

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
            logger.debug(`Environment config file loaded. File: ${process.env.ORCHE_CONFIG}`);
          }
        } catch (error) {
          throw new Error(`Orche's environment config file could not be loaded. 
                           Error: ${error.stack}`);
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
          logger.debug('Local config file loaded');
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
