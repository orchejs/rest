import 'reflect-metadata';
import { ValidatorDetails } from '../interfaces/validator-details';
import { type } from 'os';
import { ParamOptions } from '../interfaces/param-options';
import { ParamDetails } from '../interfaces/param-details';
import { ParameterLoader } from '../loaders/parameter.loader';
import { ParamType } from '../constants/param-type';

export function requestParam() {
  return function(target: object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(
      target,
      propertyKey,
      undefined,
      parameterIndex,
      ParamType.RequestParam
    );
  };
}

export function responseParam() {
  return function(target: object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(
      target,
      propertyKey,
      undefined,
      parameterIndex,
      ParamType.ResponseParam
    );
  };
}

export function nextParam() {
  return function(target: object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(
      target,
      propertyKey,
      undefined,
      parameterIndex,
      ParamType.NextParam
    );
  };
}

export function queryParam(param: string, options: ParamOptions = {}) {
  return function(target: object, propertyKey: string, parameterIndex: number) {
    const paramDetails = loadParam(target, propertyKey, param, parameterIndex, options);
    ParameterLoader.addParameterConfig(
      target,
      propertyKey,
      paramDetails,
      parameterIndex,
      ParamType.QueryParam
    );
  };
}

export function pathParam(param: string, options: ParamOptions = {}) {
  return function(target: object, propertyKey: string, parameterIndex: number) {
    const paramDetails = loadParam(target, propertyKey, param, parameterIndex, options);
    ParameterLoader.addParameterConfig(
      target,
      propertyKey,
      paramDetails,
      parameterIndex,
      ParamType.PathParam
    );
  };
}

export function requestParamMapper() {
  return function(target: object, propertyKey: string, parameterIndex: number) {
    ParameterLoader.addParameterConfig(
      target,
      propertyKey,
      undefined,
      parameterIndex,
      ParamType.RequestParamMapper
    );
  };
}

export function bodyParam(options?: ParamOptions) {
  return function(target: object, propertyKey: string, parameterIndex: number) {
    const paramDetails = loadParam(target, propertyKey, undefined, parameterIndex, options);
    ParameterLoader.addParameterConfig(
      target,
      propertyKey,
      paramDetails,
      parameterIndex,
      ParamType.BodyParam
    );
  };
}

export function headerParam(param: string, options: ParamOptions = {}) {
  return function(target: object, propertyKey: string, parameterIndex: number) {
    const paramDetails = loadParam(target, propertyKey, param, parameterIndex, options);
    ParameterLoader.addParameterConfig(
      target,
      propertyKey,
      paramDetails,
      parameterIndex,
      ParamType.HeaderParam
    );
  };
}

function loadParam(
  target: object,
  key: string,
  param?: string,
  paramIndex?: number,
  options?: ParamOptions
): ParamDetails {
  let details: ParamDetails;
  if (options) {
    const paramTypes = Reflect.getMetadata('design:paramtypes', target, key);
    details = {
      validators: options.validators,
      name: param,
      format: options.format,
      type: paramTypes[paramIndex]
    };
  }
  return details;
}
