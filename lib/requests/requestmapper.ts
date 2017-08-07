export abstract class RequestMapper {

  limit: number;
  start: number;
  columns: string[];
  expand: string[];
  sort: string[];
  pathParams: any;
  [queryParams : string]: any;

  constructor(request: any) {
    this.pathParams = {};
    this.loadPathParams(request);
    this.loadQueryParams(request);
  }

  protected abstract loadPathParams(request: any): void;

  protected abstract loadQueryParams(request: any): void;

}
