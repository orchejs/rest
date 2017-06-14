import * as express from 'express';
import * as cors from 'cors';

import { Router } from './router';
import { HttpRequestMethod } from '../constants/http-request-method';
import { HttpResponseCode } from '../constants/http-response-code';
import { MimeType } from '../constants/mimetype';
import { ParamType } from '../constants/param-type';
import { ParamConfig } from '../interfaces/param-config';
import { ErrorResponse } from '../responses/error.response';
import { ExpressRequestMapper } from '../requests/express.requestmapper';
import { RouterConfig } from '../interfaces/router-config';
import { RouterUnit } from '../interfaces/router-unit';
import { RouterLoader } from '../loaders/router.loader';
import { ParameterLoader } from '../loaders/parameter.loader';
import { PathUtils } from '../utils/path.utils';

export class ExpressRoute extends Router {

  public loadRoutes(app: express.Application, path: string): Promise<any> {
    const loadedRoutes: RouterConfig[] = [];

    return new Promise((resolve, reject) => {
      if (!RouterLoader.routerConfigs || RouterLoader.routerConfigs.length === 0) {
        reject('There is no express route to configure!');
        return;
      }

      for (let index = 0; index < RouterLoader.routerConfigs.length; index += 1) {
        let loaded: boolean = true;

        const routerConfig: RouterConfig = RouterLoader.routerConfigs[index];
        const routerConfigPath = PathUtils.urlSanitation(routerConfig.path);
        const router: express.Router = express.Router();
        const routerUnits: RouterUnit[] = routerConfig.routerUnits;

        routerUnits.forEach((routerUnit) => {
          const method: any = this.routeExecution(routerConfig.className, routerUnit.method,
                                                  routerUnit.methodName);

          if (routerUnit.preflight) {
            router.options(routerUnit.path, cors(routerUnit.corsOptions));
          }

          switch (routerUnit.httpMethod) {
            case HttpRequestMethod.Get:
              if (routerUnit.corsOptions) {
                router.get(routerUnit.path, cors(routerUnit.corsOptions), method);
              } else {
                router.get(routerUnit.path, method);
              }
              break;
            case HttpRequestMethod.Post:
              if (routerUnit.corsOptions) {
                router.post(routerUnit.path, cors(routerUnit.corsOptions), method);
              } else {
                router.post(routerUnit.path, method);
              }
              break;
            case HttpRequestMethod.Put:
              if (routerUnit.corsOptions) {
                router.put(routerUnit.path, cors(routerUnit.corsOptions), method);
              } else {
                router.put(routerUnit.path, method);
              }
              break;
            case HttpRequestMethod.Head:
              if (routerUnit.corsOptions) {
                router.head(routerUnit.path, cors(routerUnit.corsOptions), method);
              } else {
                router.head(routerUnit.path, method);
              }
              break;
            case HttpRequestMethod.Delete:
              if (routerUnit.corsOptions) {
                router.delete(routerUnit.path, cors(routerUnit.corsOptions), method);
              } else {
                router.delete(routerUnit.path, method);
              }
              break;
            case HttpRequestMethod.All:
              if (routerUnit.corsOptions) {
                router.all(routerUnit.path, cors(routerUnit.corsOptions), method);
              } else {
                router.all(routerUnit.path, method);
              }
              break;
            case HttpRequestMethod.Patch:
              if (routerUnit.corsOptions) {
                router.patch(routerUnit.path, cors(routerUnit.corsOptions), method);
              } else {
                router.patch(routerUnit.path, method);
              }
              break;
            case HttpRequestMethod.Options:
              router.options(routerUnit.path, method);
              break;
            default:
              loaded = false;
              break;
          }
        });

        const resourcePath = path + routerConfigPath;
        app.use(resourcePath, router);

        if (loaded) {
          loadedRoutes.push(routerConfig);
        }
      }

      resolve(loadedRoutes);
    });
  }

  protected routeExecution(target: string, method: Function, methodName: string): Function {
    return function () {
      const req: express.Request = arguments[0];
      const res: express.Response = arguments[1];
      const next: express.NextFunction = arguments[2];

      let endpointArgs: any = [];

      const paramConfig: ParamConfig = ParameterLoader.getParameterConfig(target, methodName);
      if (paramConfig.params && paramConfig.params.length > 0) {
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

        if (result && result.responseType === 'GenericResponse') {
          res.contentType(result.getContentType());
          res.status(result.getHttpStatus()).send(result.toObjectLiteral());
        } else {
          res.status(HttpResponseCode.Ok).send(result);
        }

        next();
      } catch (e) {
        result = new ErrorResponse(e.message, null, MimeType.json,
          HttpResponseCode.InternalServerError);
        res.contentType(result.getContentType());
        res.status(result.getHttpStatus()).send(result.toObjectLiteral());
      }
    };
  }

}
