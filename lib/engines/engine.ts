import * as fs from 'fs';
import { EventEmitter } from 'events';

import { InterceptorType } from '../constants/interceptortype';
import { InterceptorConfig } from '../interfaces/interceptorconfig';
import { OrcheConfig } from '../interfaces/orcheconfig';
import { PathUtils } from '../utils/path.utils';


export abstract class Engine {

  protected app: any;
  protected server: any;
  protected config: OrcheConfig;

  constructor(userConfig?: OrcheConfig) {
    this.loadOrcheConfig(userConfig);
  }

  /**
   * Priority hierarchy:
   * 1 - User configs
   * 2 - System variable ORCHE_CONFIG
   * 3 - App .orcherc
   * load .orcherc local or SYSTEM VARIABLE
   */
  protected loadOrcheConfig(appConfig?: OrcheConfig): void {
    const cfgApp = appConfig.appName || PathUtils.appDirName;

    let envOrcheCfg;
    if (process.env.ORCHE_CONFIG) {
      const fileContent = fs.readFileSync(process.env.ORCHE_CONFIG, 'utf8');
      envOrcheCfg = fileContent[cfgApp];
    }

    let localOrcheCfg;
    if (PathUtils.localConfigFile) {
      const fileContent = fs.readFileSync(PathUtils.localConfigFile, 'utf8');
      localOrcheCfg = fileContent;
    }

    // TODO :: made config merge

    this.config = appConfig;
  }

  public abstract loadServer(): Promise<any>;
  protected abstract isEngineVersionSupported(): boolean;
  protected abstract setupSettings(): void;
  protected abstract setupMiddleware(): void;
  protected abstract loadRoutes(app: any, path: string): Promise<any>;
  protected abstract loadInterceptors(target: string, method: Function, methodName: string): 
    Function;
  protected abstract loadPreProcessors(app: any): Promise<any>;
  protected abstract loadPostProcessors(app: any): Promise<any>;
  protected abstract loadInterceptorUnit(app: any, interceptorType: InterceptorType):
    InterceptorConfig[];
}
