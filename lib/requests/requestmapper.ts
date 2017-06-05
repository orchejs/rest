import { Request as RequestRestify } from 'restify';
import { Request as RequestExpress } from 'express';

export abstract class RequestMapper {

  limit: number;
  start: number;
  columns: Array<string>;
  expand: Array<string>;
  sort: Array<string>;
  custom: any;

  constructor(request: any) {
    this.custom = {};
    this.loadPathParams(request);
    this.loadQueryParams(request);
  }

  protected abstract loadPathParams(request: any): void;

  protected abstract loadQueryParams(request: any): void;

}