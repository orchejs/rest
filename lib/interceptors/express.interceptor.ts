import { InterceptorUnit } from '../interfaces/interceptor-unit';
import * as express from 'express';
import * as moment from 'moment';

import { MimeType } from '../constants/mimetype';
import { HttpRequestMethod } from '../constants/http-request-method';
import { HttpResponseCode } from '../constants/http-response-code';
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

  public loadProcessors(): Promise<LoadInterceptorStats> {
    return new Promise(async (resolve, reject) => {
      const preStats: LoadInterceptorStats = {};
      
      const initTime = moment();
      
      const loadedProcessors: InterceptorConfig[] = await this.loadInterceptorUnit();

      const elapsedTime: number = initTime.diff(moment(), 'seconds');

      preStats.loadedInterceptors = loadedProcessors;
      preStats.initializationTime = elapsedTime;

      resolve(preStats);
    });
  }

  public loadInterceptorUnit(): InterceptorConfig[] {
    const loadedProcessors: any = [];
    const interceptorConfigs: InterceptorConfig[] = InterceptorLoader.interceptorConfigs;

    for (let index = 0; index < interceptorConfigs.length; index += 1) {
      const loaded: boolean = true;
      const interceptorConfig: InterceptorConfig = interceptorConfigs[index];
      
      const processorUnit: InterceptorUnit = interceptorConfig.interceptorUnit;
      const method = this.interceptorProcessor(interceptorConfig.className, processorUnit.method,
                                               processorUnit.methodName);

      interceptorConfig.paths.forEach((path) => {
        const loadedHttpMethods: HttpRequestMethod[] = [];
        const interceptorConfigPath = PathUtils.urlSanitation(path);

        interceptorConfig.httpMethods.some((httpMethod: HttpRequestMethod) => {
          switch (httpMethod) {
            case HttpRequestMethod.All:
              this.app.use(interceptorConfigPath, method);
              loadedHttpMethods.push(httpMethod);
              return true;
            case HttpRequestMethod.Get:
              this.app.get(interceptorConfigPath, method);
              break;
            case HttpRequestMethod.Delete:
              this.app.delete(interceptorConfigPath, method);
              break;
            case HttpRequestMethod.Head:
              this.app.head(interceptorConfigPath, method);
              break;
            case HttpRequestMethod.Options:
              this.app.options(interceptorConfigPath, method);
              break;
            case HttpRequestMethod.Patch:
              this.app.patch(interceptorConfigPath, method);
              break;
            case HttpRequestMethod.Post:
              this.app.post(interceptorConfigPath, method);
              break;
            case HttpRequestMethod.Put:
              this.app.put(interceptorConfigPath, method);
              break;
          }
          loadedHttpMethods.push(httpMethod);
          return false;
        });

        let loadedInterceptorConfig: any = loadedProcessors.
          find(config => config.path === interceptorConfigPath);

        if (!loadedInterceptorConfig) {
          loadedInterceptorConfig = {
            path: interceptorConfigPath,
            order: interceptorConfig.order,
            httpMethods: loadedHttpMethods,
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
              endpointArgs[param.parameterIndex] = req.params[param.paramDetails.name];
              break;
            case ParamType.QueryParam:
              endpointArgs[param.parameterIndex] = req.query[param.paramDetails.name];
              break;
            case ParamType.RequestParamMapper:
              const requestMapper: ExpressRequestMapper = new ExpressRequestMapper(req);
              endpointArgs[param.parameterIndex] = requestMapper;
              break;
            case ParamType.BodyParam:
              endpointArgs[param.parameterIndex] = req.body;
              break;
            case ParamType.HeaderParam:
              endpointArgs[param.parameterIndex] = req.headers[param.paramDetails.name];
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
