/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import * as cors from 'cors';
import * as express from 'express';
import { BuildObjectResponse, PropertyLoader, ConverterUtils, UrlUtils } from '@orchejs/common';
import { ValidatorDetails, ValidatorError, ValidatorRunner } from '@orchejs/validators';
import { HttpRequestMethod, HttpResponseCode, MimeType, ParamType } from '../constants';
import { ParameterLoader } from '../loaders';
import { ExpressRequestMapper } from '../requests';
import { ErrorResponse } from '../responses';
import { Router } from './router';
import {
  ContentType,
  CorsConfig,
  ParamDetails,
  ParamOptions,
  ParamUnit,
  RouterUnit
} from '../interfaces';

export class ExpressRouter extends Router {
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
    const router: any = this.buildRouter(className, routerUnits);
    const uri: string = appPath + routerPath;
    this.app.use(uri, router);
  }

  protected createRouter(): any {
    return express.Router();
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
    }
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
      const validatorRunner = new ValidatorRunner();

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
            paramValue = ConverterUtils.convertToType(
              req.params[details.name],
              details.type.name,
              details.format
            );
            validatorErrors = await validatorRunner.runValidations(
              paramValue,
              details.name,
              details.validators
            );
            break;
          case ParamType.QueryParam:
            details = param.paramDetails;
            paramValue = ConverterUtils.convertToType(
              req.query[details.name],
              details.type.name,
              details.format
            );
            validatorErrors = await validatorRunner.runValidations(
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
            details = param.paramDetails;
            paramValue = req.body;
            validatorErrors = await validatorRunner.runValidations(
              paramValue,
              details.name,
              details.validators
            );            
            break;
          case ParamType.HeaderParam:
            details = param.paramDetails;
            paramValue = ConverterUtils.convertToType(
              req.headers[details.name],
              details.type.name,
              details.format
            );
            validatorErrors = await validatorRunner.runValidations(
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
