/*
import * as express from 'express';
import * as cors from 'cors';
import { Router } from './router';
import { CorsConfig } from '../interfaces/cors-config';
import { PropertyLoader } from '../loaders/property.loader';
import { HttpResponseCode } from '../constants/http-response-code';
import { HttpRequestMethod } from '../constants/http-request-method';
import { MimeType } from '../constants/mimetype';
import { RouterConfig } from '../interfaces/router-config';
import { UrlUtils } from '../utils/url.utils';
import { RouterUnit } from '../interfaces/router-unit';
import { ContentType } from '../interfaces/content-type';
import { ValidatorError } from '../interfaces/validator-error';
import { ParamConfig } from '../interfaces/param-config';
import { ParameterLoader } from '../loaders/parameter.loader';
import { ParamType } from '../constants/param-type';
import { RegularParamDetails } from '../interfaces/regular-param-details';
import { ExpressRequestMapper } from '../requests/express.request-mapper';
import { BodyParamDetails } from '../interfaces/body-param-details';
import { BuildObjectResponse } from '../interfaces/build-object-response';
import { ErrorResponse } from '../responses/error.response';

export class ExpressRouter {
  constructor(app: express.Application) {
    super(app);
  }

  public loadRoutes(path: string): LoadRouterStats {
    for (let index = 0; index < RouterLoader.routerConfigs.length; index += 1) {
      const routerConfig: RouterConfig = RouterLoader.routerConfigs[index];
      const routerConfigPath = UrlUtils.urlSanitation(routerConfig.path);
      const router: express.Router = express.Router();
      const routerUnits: RouterUnit[] = routerConfig.routerUnits;

      routerUnits.forEach(routerUnit => {
        const routerMethod: any = this.routeProcessor(
          routerConfig.className,
          routerUnit.method,
          routerUnit.methodName,
          routerUnit.contentType
        );

        const unitPath: string = UrlUtils.urlSanitation(routerUnit.path);

        const corsConfig: CorsConfig = routerUnit.cors || {};
        if (corsConfig.preflight) {
          router.options(unitPath, cors(corsConfig.corsOptions));
        }

        const middlewares: any[] = routerUnit.middlewares;
        if (corsConfig.corsOptions) {
          middlewares.unshift(cors(corsConfig.corsOptions));
        }
        middlewares.push(routerMethod);

        switch (routerUnit.httpMethod) {
          case HttpRequestMethod.Get:
            router.get(unitPath, middlewares);
            break;
          case HttpRequestMethod.Post:
            router.post(unitPath, middlewares);
            break;
          case HttpRequestMethod.Put:
            router.put(unitPath, middlewares);
            break;
          case HttpRequestMethod.Head:
            router.head(unitPath, middlewares);
            break;
          case HttpRequestMethod.Delete:
            router.delete(unitPath, middlewares);
            break;
          case HttpRequestMethod.All:
            router.all(unitPath, middlewares);
            break;
          case HttpRequestMethod.Patch:
            router.patch(unitPath, middlewares);
            break;
          case HttpRequestMethod.Options:
            router.options(unitPath, middlewares);
            break;
        }
      });

      const resourcePath = path + routerConfigPath;
      this.app.use(resourcePath, router);

      routerStats.loadedRoutes.push(routerConfig);
    }

    routerStats.initializationTime = initTime.diff(moment(), 'seconds');
    return routerStats;
  }

  protected routeProcessor(
    target: string,
    method: Function,
    methodName: string,
    contentType: ContentType
  ): any {
    return function() {
      const req: express.Request = arguments[0];
      const res: express.Response = arguments[1];
      const next: express.NextFunction = arguments[2];

      const validatorErrors: ValidatorError[] = [];
      let endpointArgs: any = [];

      const paramConfig: ParamConfig = ParameterLoader.getParameterConfig(target, methodName);
      if (paramConfig && paramConfig.params && paramConfig.params.length > 0) {
        paramConfig.params.forEach(async (param, index) => {
          let details;
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
              details = param.paramDetails.details as RegularParamDetails;
              endpointArgs[param.parameterIndex] = req.params[details.name];
              break;
            case ParamType.QueryParam:
              details = param.paramDetails.details as RegularParamDetails;
              endpointArgs[param.parameterIndex] = req.query[details.name];
              break;
            case ParamType.RequestParamMapper:
              const requestMapper: ExpressRequestMapper = new ExpressRequestMapper(req);
              endpointArgs[param.parameterIndex] = requestMapper;
              break;
            case ParamType.BodyParam:
              let paramValue: any;
              if (param && param.paramDetails) {
                details = param.paramDetails.details as BodyParamDetails;
                const loadResult: BuildObjectResponse = 
                  await PropertyLoader.loadPropertiesFromObject(
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
              details = param.paramDetails.details as RegularParamDetails;
              endpointArgs[param.parameterIndex] = req.headers[details.name];
              break;
          }
        });
      } else {
        endpointArgs = arguments;
      }

      let result: any;
      try {
        result = method.apply(this, endpointArgs);

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
  }
}
*/
