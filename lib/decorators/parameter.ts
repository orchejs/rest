import { ParamDetails } from '../interfaces/param-details';
import { ParameterLoader } from '../loaders/parameter.loader';
import { ParamType } from '../constants/param-type';


export function requestParam() {
  return function (target: Object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, undefined, parameterIndex,
                                       ParamType.RequestParam);
  };
}

export function responseParam() {
  return function (target: Object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, undefined, parameterIndex,
                                       ParamType.ResponseParam);
  };
}

export function nextParam() {
  return function (target: Object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, undefined, parameterIndex,
                                       ParamType.NextParam);
  };
}

export function queryParam(param: ParamDetails) {
  return function (target: Object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, param, parameterIndex,
                                       ParamType.QueryParam);
  };
}

export function pathParam(param: ParamDetails) {
  return function (target: Object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, param, parameterIndex,
                                       ParamType.PathParam);
  };
}

export function requestParamMapper() {
  return function (target: Object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, undefined, parameterIndex,
                                       ParamType.RequestParamMapper);
  };
}

export function bodyParam(param: ParamDetails = { name: null }) {
  return function (target: Object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, param, parameterIndex,
                                       ParamType.BodyParam);
  };
}

export function headerParam(param: ParamDetails) {
  return function (target: Object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, param, parameterIndex,
                                       ParamType.HeaderParam);
  };
}
