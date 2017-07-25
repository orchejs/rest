import * as express from 'express';
import * as moment from 'moment';

import { MimeType } from '../constants/mimetype';
import { HttpResponseCode } from '../constants/http-response-code';
import { InterceptorType } from '../constants/interceptor-type';
import { Interceptor } from './interceptor';
import { InterceptorConfig } from '../interfaces/interceptor-config';
import { LoadInterceptorStats } from '../interfaces/load-interceptor-stats';
import { InterceptorLoader } from '../loaders/interceptor.loader';
import { PathUtils } from '../utils/path.utils';
import { ParamType } from '../constants/param-type';
import { ParamConfig } from '../interfaces/param-config';
import { ParameterLoader } from '../loaders/parameter.loader';
import { ExpressRequestMapper } from '../requests/express.requestmapper';
import { ErrorResponse } from '../responses/error.response';


export class ExpressInterceptor extends Interceptor {

  constructor(app: express.Application) {
    super(app);
  }

  public loadPreProcessors(): Promise<LoadInterceptorStats> {
    return new Promise(async (resolve, reject) => {
      const preStats: LoadInterceptorStats = {};
      
      const initTime = moment();
      
      const loadedPreProcessors: InterceptorConfig[] = await
        this.loadInterceptorUnit(InterceptorType.PreProcessing);

      const elapsedTime: number = initTime.diff(moment(), 'seconds');

      preStats.loadedPreProcessingInterceptors = loadedPreProcessors;
      preStats.initializationTime = elapsedTime;

      resolve(preStats);
    });
  }

  public loadPostProcessors(): Promise<LoadInterceptorStats> {
    return new Promise(async (resolve, reject) => {
      const postStats: LoadInterceptorStats = {};
      
      const initTime = moment();

      const loadedPostProcessors: InterceptorConfig[] =
        await this.loadInterceptorUnit(InterceptorType.PostProcessing);

      const elapsedTime: number = initTime.diff(moment(), 'seconds');

      postStats.loadedPostProcessingInterceptors = loadedPostProcessors;
      postStats.initializationTime += elapsedTime;
      
      resolve(postStats);
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

      const method = this.interceptorProcessor(interceptorConfig.className, processorUnit.method,
                                               processorUnit.methodName);

      interceptorConfig.paths.forEach((path) => {
        const interceptorConfigPath = PathUtils.urlSanitation(path);

        this.app.use(interceptorConfigPath, method);

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

  protected interceptorProcessor(target: string, method: Function, methodName: string): Function {
    return function () {
      const req: express.Request = arguments[0];
      const res: express.Response = arguments[1];
      const next: express.NextFunction = arguments[2];

      let endpointArgs: any = [];
      
      const paramConfig: ParamConfig = ParameterLoader.getParameterConfig(target, methodName);
      if (paramConfig && paramConfig.params && paramConfig.params.length > 0) {
        paramConfig.params.forEach((param, index) => {
          switch (param.type) {
            case ParamType.RequestParam:
              endpointArgs[param.parameterIndex] = req;
              break;
            case ParamType.ResponseParam:
              endpointArgs[param.parameterIndex] = res;
              break;
            case ParamType.NextParam:
              endpointArgs[param.parameterIndex] = next;
              break;
            case ParamType.PathParam:
              endpointArgs[param.parameterIndex] = req.params[param.paramName];
              break;
            case ParamType.QueryParam:
              endpointArgs[param.parameterIndex] = req.query[param.paramName];
              break;
            case ParamType.RequestParamMapper:
              const requestMapper: ExpressRequestMapper = new ExpressRequestMapper(req);
              endpointArgs[param.parameterIndex] = requestMapper;
              break;
          }
        });
      } else {
        endpointArgs = arguments;
      }

      let result: any;
      try {
        result = method.apply(this, endpointArgs);
        
        if (result && result.isResponseType) {
          res.contentType(MimeType.json.toString());
          res.status(result.getHttpStatus()).send(result.toObjectLiteral());
        } else if (result) {
          res.contentType(MimeType.json.toString());
          res.status(HttpResponseCode.Ok).send(result);
        } else {
          next();
        }

      } catch (e) {
        result = new ErrorResponse(e.message, null, HttpResponseCode.InternalServerError);
        res.contentType(MimeType.json.toString());
        res.status(result.getHttpStatus()).send(result.toObjectLiteral());
      }
    };
  }
}
