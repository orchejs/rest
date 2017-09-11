import { ValidatorDetails } from '../interfaces/validator-details';
import * as Reflect from 'reflect-metadata';
import { type } from 'os';
import { ParamInfo } from '../interfaces/param-info';
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

export function queryParam(param: string, validators?: ValidatorDetails[]) {
  return function(target: object, propertyKey: string, parameterIndex: number) {
    const paramDetails: ParamDetails = loadParam(param);
    ParameterLoader.addParameterConfig(
      target,
      propertyKey,
      paramDetails,
      parameterIndex,
      ParamType.QueryParam
    );
  };
}

export function pathParam(param: string, validators?: ValidatorDetails[]) {
  return function(target: object, propertyKey: string, parameterIndex: number, ...args: any[]) {
    const paramDetails: ParamDetails = loadParam(param);
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

export function bodyParam(param?: string, validators?: ValidatorDetails[]) {
  return function(target: object, propertyKey: string, parameterIndex: number) {
    const paramDetails = param ? { details: param } : undefined;
    ParameterLoader.addParameterConfig(
      target,
      propertyKey,
      paramDetails,
      parameterIndex,
      ParamType.BodyParam
    );
  };
}

export function headerParam(param: string, validators?: ValidatorDetails) {
  return function(target: object, propertyKey: string, parameterIndex: number) {
    const paramDetails: ParamDetails = loadParam(param);
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
  validators?: ValidatorDetails[]
): ParamDetails {
  let details: ParamDetails;

  const type = Reflect.getMetadata('design:type', target, key);

  return details;
}
