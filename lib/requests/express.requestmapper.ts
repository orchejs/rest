import { Request } from 'express';
import { RequestMapper } from './requestmapper';

export class ExpressRequestMapper extends RequestMapper {

  constructor(request: Request) {
    super(request);
  }

  protected loadPathParams(request: Request): void {
    let params = request.params;

    if (!params) {
      return;
    }

    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        this.custom[key] = params[key];
      }
    }
  }

  protected loadQueryParams(request: Request): void {
    let params = request.query;

    if (!params) {
      return;
    }

    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        switch (key) {
          case 'expand':
            let expand: string = params['expand'];
            if (expand) {
              this.expand = expand.split(',');
            }
            break;
          case 'columns':
            let columns: string = params['columns'];
            if (columns) {
              this.columns = columns.split(',');
            }
            break;
          case 'sort':
            let sort: string = params['sort'];
            if (sort) {
              this.sort = sort.split(',');
            }
            break;
          case 'limit':
            this.limit = params['limit'];
            break;
          case 'start':
            this.start = params['start'];
            break;
          default:
            this.custom[key] = params[key];
            break;
        }
      }
    }
  }

}