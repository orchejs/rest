import * as cors from 'cors';
import * as express from 'express';
import { HttpRequestMethod, HttpResponseCode, MimeType, ParamType } from '../constants';
import {
  BuildObjectResponse,
  ContentType,
  CorsConfig,
  ParamDetails,
  ParamOptions,
  ParamUnit,
  RouterUnit,
  ValidatorDetails,
  ValidatorError
} from '../interfaces';
import { ParameterLoader, PropertyLoader } from '../loaders';
import { ExpressRequestMapper } from '../requests';
import { ErrorResponse } from '../responses';
import { Router } from './router';
import { ValidatorUtils, ConverterUtils } from '../utils';

export class ExpressRouter extends Router {
  constructor(app: any) {
    super(app);
  }

  protected createRouter(): any {
    return express.Router();
  }

  protected addRouterToApp(appPath: string, routerPath: string, router: any): void {
    const uri: string = appPath + routerPath;
    this.app.use(uri, router);
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
    const getParamValue = this.getParamValue;
    const executor = async function() {
      const req: express.Request = arguments[0];
      const res: express.Response = arguments[1];
      const next: express.NextFunction = arguments[2];

      let endpointArgs: any = [];
      try {
        endpointArgs = await loadParams(target, methodName, getParamValue, arguments);
      } catch (error) {
        console.log('aqui', error);
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

  protected getParamValue(
    param: ParamUnit,
    args: any
  ): Promise<{
    validatorErrors: ValidatorError[];
    value: any;
  }> {
    return new Promise(async (resolve, reject) => {
      let details: ParamDetails;
      let paramValue: any;
      let validatorErrors: ValidatorError[] = [];

      const req: express.Request = args[0];
      const res: express.Response = args[1];
      const next: express.NextFunction = args[2];
      try {
        switch (param.type) {
          case ParamType.RequestParam:
            paramValue = req;
            break;
          case ParamType.ResponseParam:
            paramValue = res;
            break;
          case ParamType.NextParam:
            paramValue = next;
            break;
          case ParamType.PathParam:
            details = param.paramDetails;
            paramValue = ConverterUtils.convertToType(req.params[details.name], details.type);
            validatorErrors = await ValidatorUtils.runValidations(
              paramValue,
              details.name,
              details.validators
            );
            break;
          case ParamType.QueryParam:
            details = param.paramDetails;
            paramValue = ConverterUtils.convertToType(req.query[details.name], details.type);
            validatorErrors = await ValidatorUtils.runValidations(
              paramValue,
              details.name,
              details.validators
            );
            break;
          case ParamType.RequestParamMapper:
            const requestMapper: ExpressRequestMapper = new ExpressRequestMapper(req);
            paramValue = requestMapper;
            break;
          case ParamType.BodyParam:
            if (param && param.paramDetails) {
              details = param.paramDetails;
              const loadResult: BuildObjectResponse = await PropertyLoader.loadPropertiesFromObject(
                req.body,
                details
              );
              if (loadResult.validatorErrors.length > 0) {
                validatorErrors = loadResult.validatorErrors;
              }
              paramValue = loadResult.object;
            } else {
              paramValue = req.body;
            }
            break;
          case ParamType.HeaderParam:
            details = param.paramDetails;
            paramValue = ConverterUtils.convertToType(req.headers[details.name], details.type);
            validatorErrors = await ValidatorUtils.runValidations(
              paramValue,
              details.name,
              details.validators
            );
            break;
        }
        resolve({
          validatorErrors,
          value: paramValue
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}
