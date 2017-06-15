import * as express from 'express';

import { Interceptor } from './interceptor';
import { InterceptorType } from '../constants/interceptor-type';
import { InterceptorConfig } from '../interfaces/interceptor-config';
import { InterceptorLoader } from '../loaders/interceptor.loader';
import { PathUtils } from '../utils/path.utils';


export class ExpressInterceptor extends Interceptor {

  protected loadPreProcessors(app: express.Application): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const loadedPreProcessors: InterceptorConfig[] = await
        this.loadInterceptorUnit(app, InterceptorType.PreProcessing);

      resolve(loadedPreProcessors);
    });
  }

  protected loadPostProcessors(app: express.Application): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const loadedPostProcessors: InterceptorConfig[] =
        await this.loadInterceptorUnit(app, InterceptorType.PostProcessing);

      resolve(loadedPostProcessors);
    });
  }

  protected loadInterceptorUnit(app: express.Application, 
                                interceptorType: InterceptorType): InterceptorConfig[] {

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

        app.use(interceptorConfigPath, processorUnit.classMethod);

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
