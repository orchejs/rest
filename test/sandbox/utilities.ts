import { Request } from 'express';

import { all, del, GenericResponse, get, head, headerParam, HttpResponseCode, options,
         patch, path, pathParam, post, put, requestParam } from '../../';

@path('/utilities')
class Utilities {

  @all()
  ping(@requestParam() requestParam: Request) {
    requestParam.headers['Authorization'] = 'test';
  }

  @get()
  justPing() {
    return { msg: 'ping' };
  }

  @post()
  postPing(@requestParam() request): GenericResponse {
    let ip: string = '';
    if (request.body) {
      ip = request.body['ip'];
    }
    const response: any = new GenericResponse({ msg: `pinging ${ip}` }, HttpResponseCode.Ok);
    return response;
  }

  @put()
  putPing(@requestParam() request): GenericResponse {
    let ip: string = '';
    if (request.body) {
      ip = request.body['ip'];
    }
    const response: any = new GenericResponse({ msg: `pinging ${ip}` }, HttpResponseCode.Ok);
    return response;
  }

  @patch()
  patchPing(@requestParam() request): GenericResponse {
    let ip: string = '';
    if (request.body) {
      ip = request.body['ip'];
    }
    const response: any = new GenericResponse({ msg: `pinging ${ip}` }, HttpResponseCode.Ok);
    return response;
  }

  @options()
  optionsPing(): GenericResponse {
    const response: any = new GenericResponse(null, HttpResponseCode.Ok);
    return response;
  }

  @head()
  headPing(@headerParam('Authorization') auth): GenericResponse {
    const response: any = new GenericResponse({ msg: `Authorization was: ${auth}` }, 
                                              HttpResponseCode.Ok);
    return response;
  }  

  @del('/:ip')
  delPing(@pathParam('ip') ip): GenericResponse {
    const response: any = new GenericResponse({ msg: `delete ip: ${ip}` }, 
                                              HttpResponseCode.Ok);
    return response;
  }
}
