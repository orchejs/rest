import { RegularParamDetails } from '../interfaces/regular-param-details';
import { BodyParamDetails } from '../interfaces/body-param-details';
import { ParamDetails } from '../interfaces/param-details';
import { ParameterLoader } from '../loaders/parameter.loader';
import { ParamType } from '../constants/param-type';


export function requestParam() {
  return function (target: object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, undefined, parameterIndex,
                                       ParamType.RequestParam);
  };
}

export function responseParam() {
  return function (target: object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, undefined, parameterIndex,
                                       ParamType.ResponseParam);
  };
}

export function nextParam() {
  return function (target: object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, undefined, parameterIndex,
                                       ParamType.NextParam);
  };
}

export function queryParam(param: string | RegularParamDetails) {
  return function (target: object, propertyKey: string, parameterIndex: number) {
    const paramDetails: ParamDetails = loadParam(param);
    ParameterLoader.addParameterConfig(target, propertyKey, paramDetails, parameterIndex,
                                       ParamType.QueryParam);
  };
}

export function pathParam(param: string | RegularParamDetails) {
  return function (target: object, propertyKey: string, parameterIndex: number) {
    const paramDetails: ParamDetails = loadParam(param);
    ParameterLoader.addParameterConfig(target, propertyKey, paramDetails, parameterIndex,
                                       ParamType.PathParam);
  };
}

export function requestParamMapper() {
  return function (target: object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, undefined, parameterIndex,
                                       ParamType.RequestParamMapper);
  };
}

export function bodyParam(param?: BodyParamDetails) {
  return function (target: object, propertyKey: string, parameterIndex: number) {
    const paramDetails = param ? { details: param } : undefined;
    ParameterLoader.addParameterConfig(target, propertyKey, paramDetails, parameterIndex,
                                       ParamType.BodyParam);
  };
}

export function headerParam(param: string | RegularParamDetails) {
  return function (target: object, propertyKey: string, parameterIndex: number) {
    const paramDetails: ParamDetails = loadParam(param);
    ParameterLoader.addParameterConfig(target, propertyKey, paramDetails, parameterIndex,
                                       ParamType.HeaderParam);
  };
}

function loadParam(param?: string | RegularParamDetails): ParamDetails {
  let regularParamDetails: RegularParamDetails;
  if (typeof param === 'string') {
    regularParamDetails = {
      name: param
    };
  } else {
    regularParamDetails = param;
  }
  return { details: regularParamDetails };
}
