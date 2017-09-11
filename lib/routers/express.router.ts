import { ValidatorError } from '../interfaces/validator-error';
import {
  RouterUnit,
  ContentType,
  CorsConfig,
  ParamUnit,
  ParamInfo,
  BuildObjectResponse
} from '../interfaces';
import * as express from 'express';
import * as cors from 'cors';
import { ExpressRequestMapper } from '../requests';
import { ErrorResponse } from '../responses';
import { PropertyLoader } from '../loaders';
import { HttpRequestMethod, HttpResponseCode, MimeType, ParamType } from '../constants';
import { Router } from './router';

export class ExpressRouter extends Router {
  protected createRouter(): any {
    return express.Router();
  }

  protected addRoute(
    router: any,
    path: string,
    corsConfig: CorsConfig = {},
    middlewares: any[],
    httpMethod: HttpRequestMethod
  ): any {
    if (corsConfig.preflight) {
      router.options(path, cors(corsConfig.corsOptions));
    }

    if (corsConfig.corsOptions) {
      middlewares.unshift(cors(corsConfig.corsOptions));
    }
    switch (httpMethod) {
      case HttpRequestMethod.Get:
        router.get(path, middlewares);
        break;
      case HttpRequestMethod.Post:
        router.post(path, middlewares);
        break;
      case HttpRequestMethod.Put:
        router.put(path, middlewares);
        break;
      case HttpRequestMethod.Head:
        router.head(path, middlewares);
        break;
      case HttpRequestMethod.Delete:
        router.delete(path, middlewares);
        break;
      case HttpRequestMethod.All:
        router.all(path, middlewares);
        break;
      case HttpRequestMethod.Patch:
        router.patch(path, middlewares);
        break;
      case HttpRequestMethod.Options:
        router.options(path, middlewares);
        break;
    }
  }

  protected routeExecution(
    target: string,
    method: Function,
    methodName: string,
    contentType: ContentType
  ): Function {
    const loadParams = this.loadParams;
    const addParameter = this.addParameter;
    const executor = async function() {
      const req: express.Request = arguments[0];
      const res: express.Response = arguments[1];
      const next: express.NextFunction = arguments[2];

      let endpointArgs: any = [];
      try {
        endpointArgs = await loadParams(target, methodName, addParameter, arguments);        
      } catch (error) {
        // TODO deal validation error!
      }

      let result: any;
      try {
        result = await method.apply(this, endpointArgs);
        if (res.headersSent) {
          return;
        } else if (result && result.isResponseType) {
          res.contentType(contentType.response['value']);
          res.status(result.getHttpStatus()).send(result.toObjectLiteral());
        } else if (result) {
          res.contentType(contentType.response['value']);
          res.status(HttpResponseCode.Ok).send(result);
        } else {
          next();
        }
      } catch (e) {
        if (res.headersSent) {
          return;
        }
        result = new ErrorResponse(e.message, null, HttpResponseCode.InternalServerError);
        res.contentType(MimeType.json.toString());
        res.status(result.getHttpStatus()).send(result.toObjectLiteral());
      }
    };
    return executor;
  }

  protected addRouterToApp(appPath: string, routerPath: string, router: any): void {
    const uri: string = appPath + routerPath;
    this.app.use(uri, router);
  }

  protected addParameter(
    param: ParamUnit,
    validatorErrors: ValidatorError[],
    args: any
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let details;
      const endpointArgs: any[] = [];
      const req: express.Request = args[0];
      const res: express.Response = args[1];
      const next: express.NextFunction = args[2];
      try {
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
            details = param.paramDetails;
            endpointArgs[param.parameterIndex] = req.params[details.name];
            break;
          case ParamType.QueryParam:
            details = param.paramDetails;
            endpointArgs[param.parameterIndex] = req.query[details.name];
            break;
          case ParamType.RequestParamMapper:
            const requestMapper: ExpressRequestMapper = new ExpressRequestMapper(req);
            endpointArgs[param.parameterIndex] = requestMapper;
            break;
          case ParamType.BodyParam:
            let paramValue: any;
            if (param && param.paramDetails) {
              details = param.paramDetails;
              const loadResult: BuildObjectResponse = await PropertyLoader.loadPropertiesFromObject(
                req.body,
                details
              );
              if (loadResult.validatorErrors.length > 0) {
                validatorErrors.concat(loadResult.validatorErrors);
                return;
              }
              paramValue = loadResult.object;
            } else {
              paramValue = req.body;
            }
            endpointArgs[param.parameterIndex] = paramValue;
            break;
          case ParamType.HeaderParam:
            details = param.paramDetails;
            endpointArgs[param.parameterIndex] = req.headers[details.name];
            break;
        }
  
        resolve(endpointArgs);
      } catch (err) {
        reject(err);
      }
    });
  }
}
