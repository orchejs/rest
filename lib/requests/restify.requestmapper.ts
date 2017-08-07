import { Request } from 'express';
import { ExpressRequestMapper } from './express.requestmapper';

export class RestifyRequestMapper extends ExpressRequestMapper {

  constructor(request: Request) {
    super(request);
  }

}
