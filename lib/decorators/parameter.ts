import { ParameterLoader } from '../loaders/parameter.loader';
import { ParamType } from '../constants/paramtype';


export function RequestParam() {
  return function (target: Object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, undefined, parameterIndex,
      ParamType.RequestParam);
  };
}

export function ResponseParam() {
  return function (target: Object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, undefined, parameterIndex,
      ParamType.ResponseParam);
  };
}

export function NextParam() {
  return function (target: Object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, undefined, parameterIndex,
      ParamType.NextParam);
  };
}

export function QueryParam(queryParamName: string) {
  return function (target: Object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, queryParamName, parameterIndex,
      ParamType.QueryParam);
  };
}

export function PathParam(pathParamName: string) {
  return function (target: Object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, pathParamName, parameterIndex,
      ParamType.PathParam);
  };
}

export function RequestParamMapper() {
  return function (target: Object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(target, propertyKey, undefined, parameterIndex,
      ParamType.RequestParamMapper);
  };
}
