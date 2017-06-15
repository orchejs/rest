import * as express from 'express';

import { Interceptor } from './interceptor';
import { InterceptorType } from '../constants/interceptor-type';
import { InterceptorConfig } from '../interfaces/interceptor-config';
import { InterceptorLoader } from '../loaders/interceptor.loader';
import { PathUtils } from '../utils/path.utils';


export class ExpressInterceptor extends Interceptor {

  constructor(app: express.Application) {
    super(app);
  }

  public loadPreProcessors(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const loadedPreProcessors: InterceptorConfig[] = await
        this.loadInterceptorUnit(InterceptorType.PreProcessing);

      resolve(loadedPreProcessors);
    });
  }

  public loadPostProcessors(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const loadedPostProcessors: InterceptorConfig[] =
        await this.loadInterceptorUnit(InterceptorType.PostProcessing);

      resolve(loadedPostProcessors);
    });
  }

  public loadInterceptorUnit(interceptorType: InterceptorType): InterceptorConfig[] {

    const loadedProcessors: any = [];
    const interceptorConfigs: InterceptorConfig[] = InterceptorLoader.interceptorConfigs;

    if (!interceptorConfigs || interceptorConfigs.length === 0) {
      return loadedProcessors;
    }

    for (let index = 0; index < interceptorConfigs.length; index += 1) {
      const loaded: boolean = true;
      const interceptorConfig: InterceptorConfig = interceptorConfigs[index];

      const processorUnit = interceptorConfig.interceptorUnits.
        find(unit => unit.type === interceptorType);

      if (!processorUnit) {
        continue;
      }

      interceptorConfig.paths.forEach((path) => {
        const interceptorConfigPath = PathUtils.urlSanitation(path);

        this.app.use(interceptorConfigPath, processorUnit.classMethod);

        let loadedInterceptorConfig = loadedProcessors.
          find(config => config.path === interceptorConfigPath);

        if (!loadedInterceptorConfig) {
          loadedInterceptorConfig = {
            path: interceptorConfigPath,
            order: interceptorConfig.order,
            interceptorUnits: [],
          };

          loadedProcessors.push(loadedInterceptorConfig);
        }
        loadedInterceptorConfig.interceptorUnits.push(processorUnit);
      });
    }

    return loadedProcessors;    
  }

}
