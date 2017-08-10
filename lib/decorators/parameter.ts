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

export function queryParam(queryParamName: string) {
  return function (target: Object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, queryParamName, parameterIndex,
                                       ParamType.QueryParam);
  };
}

export function pathParam(pathParamName: string) {
  return function (target: Object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, pathParamName, parameterIndex,
                                       ParamType.PathParam);
  };
}

export function requestParamMapper() {
  return function (target: Object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, undefined, parameterIndex,
                                       ParamType.RequestParamMapper);
  };
}

export function bodyParam() {
  return function (target: Object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, undefined, parameterIndex,
                                       ParamType.BodyParam);
  };
}

export function headerParam(attribute: string) {
  return function (target: Object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, attribute, parameterIndex,
                                       ParamType.HeaderParam);
  };
}
