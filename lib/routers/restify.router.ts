/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { Router } from './';
import * as restify from 'restify';
import { BuildObjectResponse, PropertyLoader, UrlUtils, ConverterUtils } from '@orchejs/common';
import { ValidatorError } from '@orchejs/validators';
import { RestifyRequestMapper } from '../requests';
import { ErrorResponse } from '../responses';
import { HttpRequestMethod, HttpResponseCode, MimeType, ParamType } from '../constants';
import { ContentType, CorsConfig, ParamUnit, RouterUnit, ParamDetails } from '../interfaces';

export class RestifyRouter extends Router {
  constructor(app: any) {
    super(app);
  }

  protected addRouterToApp(
    path: string,
    className: string,
    routerUnits: RouterUnit[],
    appPath: string
  ): void {
    const routerPath = UrlUtils.urlSanitation(path);
    const routerUnitsWithFullPath = routerUnits.map(unit => {
      const unitPath = UrlUtils.urlSanitation(unit.path || '');
      const uri: string = appPath + routerPath + unitPath;
      unit.path = uri;
      return unit;
    });
    const router: any = this.buildRouter(className, routerUnitsWithFullPath);
  }

  protected createRouter() {
    return this.app;
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
      const req: restify.Request = arguments[0];
      const res: restify.Response = arguments[1];
      const next: restify.Next = arguments[2];

      let endpointArgs: any = [];
      try {
        endpointArgs = await loadParams(target, methodName, getParamValue, arguments);
      } catch (error) {
        // TODO deal validation error!
      }

      let result: any;
      try {
        result = await method.apply(this, endpointArgs);
        if (res.headersSent) {
          return;
        } else if (result && result.isResponseType) {
          res.contentType = contentType.response['value'];
          res.send(result.getHttpStatus(), result.toObjectLiteral());
        } else if (result) {
          res.contentType = contentType.response['value'];
          res.send(HttpResponseCode.Ok, result);
        } else {
          next();
        }
      } catch (e) {
        if (res.headersSent) {
          return;
        }
        result = new ErrorResponse(e.message, null, HttpResponseCode.InternalServerError);
        res.contentType = MimeType.json.toString();
        res.send(result.getHttpStatus(), result.toObjectLiteral());
      }
    };
    return executor;
  }

  protected addRoute(
    router: any,
    path: string,
    corsConfig: CorsConfig = {},
    middlewares: any[],
    httpMethod: HttpRequestMethod
  ): void {
    if (corsConfig.preflight) {
      // router.options(path, cors(corsConfig.corsOptions));
    }

    if (corsConfig.corsOptions) {
      // middlewares.unshift(cors(corsConfig.corsOptions));
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

  protected getParamValue(
    param: ParamUnit,
    args: any
  ): Promise<{ validatorErrors: ValidatorError[]; value: any }> {
    return new Promise(async (resolve, reject) => {
      let details: ParamDetails;
      let paramValue: any;
      let validatorErrors: ValidatorError[] = [];

      const req: restify.Request = args[0];
      const res: restify.Response = args[1];
      const next: restify.Next = args[2];
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
            validatorErrors = await this.validatorRunner.runValidations(
              paramValue,
              details.name,
              details.validators!
            );
            break;
          case ParamType.QueryParam:
            details = param.paramDetails;
            paramValue = ConverterUtils.convertToType(req.query[details.name], details.type);
            validatorErrors = await this.validatorRunner.runValidations(
              paramValue,
              details.name,
              details.validators!
            );
            break;
          case ParamType.RequestParamMapper:
            const requestMapper: RestifyRequestMapper = new RestifyRequestMapper(req);
            paramValue = requestMapper;
            break;
          case ParamType.BodyParam:
            if (param && param.paramDetails) {
              details = param.paramDetails;
              const loadResult: BuildObjectResponse = await PropertyLoader.loadPropertiesFromObject(
                req.body,
                details.type
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
            validatorErrors = await this.validatorRunner.runValidations(
              paramValue,
              details.name,
              details.validators!
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
