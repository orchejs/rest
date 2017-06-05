import { Application, Router } from 'express';
import { PathUtils } from '../utils/path.utils';
import { InterceptorConfig } from '../interfaces/interceptorconfig';
import { InterceptorUnit } from '../interfaces/interceptorunit';
import { InterceptorType } from '../constants/interceptortype';

export class InterceptorLoader {

  private static interceptorConfigs: InterceptorConfig[] = [];
  private static interceptorUnits: InterceptorUnit[] = [];

  static addInterceptorConfig(paths?: string[], order?: number) {
    const interceptorPaths: string[] = paths || ['/'];
    const interceptorOrder: number = order || this.interceptorConfigs.length + 1;

    const interceptorConfig: InterceptorConfig = {
      paths: interceptorPaths,
      order: interceptorOrder,
      interceptorUnits: this.interceptorUnits,
    };

    this.interceptorConfigs.push(interceptorConfig);
    this.interceptorConfigs.sort((a, b) => a.order - b.order);
    this.interceptorUnits = [];
  }

  static addInterceptorUnit(classMethod: any, type: InterceptorType) {
    const interceptorUnit: InterceptorUnit = {
      classMethod,
      type,
    };

    this.interceptorUnits.push(interceptorUnit);
  }

  static loadPreProcessors(app: Application): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let loadedPreProcessors: Array<InterceptorConfig> = await this.loadInterceptorUnit(app, InterceptorType.PreProcessing);
      resolve(loadedPreProcessors);
    });
  }

  static loadPostProcessors(app: Application): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let loadedPostProcessors: Array<InterceptorConfig> = await this.loadInterceptorUnit(app, InterceptorType.PostProcessing);
      resolve(loadedPostProcessors);
    });
  }

  private static loadInterceptorUnit(app: Application, InterceptorType: InterceptorType): Array<InterceptorConfig> {
    let loadedProcessors: Array<any> = [];

    if (!this.interceptorConfigs || this.interceptorConfigs.length === 0) {
      return loadedProcessors;
    }

    for (let index = 0; index < this.interceptorConfigs.length; index += 1) {
      let loaded: boolean = true;
      let interceptorConfig: InterceptorConfig = this.interceptorConfigs[index];

      let processorUnit = interceptorConfig.interceptorUnits.find(unit => unit.type === InterceptorType);
      if (!processorUnit) {
        continue;
      }

      interceptorConfig.paths.forEach(path => {
        let interceptorConfigPath = PathUtils.urlSanitation(path);

        app.use(interceptorConfigPath, processorUnit.classMethod);

        let loadedInterceptorConfig = loadedProcessors.find(config => config.path === interceptorConfigPath);

        if (!loadedInterceptorConfig) {
          loadedInterceptorConfig = {
            path: interceptorConfigPath,
            order: interceptorConfig.order,
            interceptorUnits: []
          };

          loadedProcessors.push(loadedInterceptorConfig);
        }
        loadedInterceptorConfig.interceptorUnits.push(processorUnit);
      });
    }

    return loadedProcessors;
  }

}
