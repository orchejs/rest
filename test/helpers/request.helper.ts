import { ClientRequest, request, RequestOptions } from 'http';

import { HttpRequestMethod, MimeType } from '../../';


export class RequestHelper {

  static post(path: string, data: any, contentType?: MimeType, port?: number,
              host?: string, protocol?: string): Promise<any> {

    let dataToSend: string = '';
    if (data) {
      dataToSend = JSON.stringify(data);
    }

    return new Promise((resolve, reject) => {
      const req: ClientRequest = this.makeRequest(path, HttpRequestMethod.Post, contentType,
                                                  port, host, protocol, null, resolve, reject);

      req.write(dataToSend);
      req.end();
    });
  }

  static put(path: string, data: any, contentType?: MimeType, port?: number,
             host?: string, protocol?: string): any {
    let dataToSend: string = '';
    if (data) {
      dataToSend = JSON.stringify(data);
    }

    return new Promise((resolve, reject) => {
      const req: ClientRequest = this.makeRequest(path, HttpRequestMethod.Put, contentType,
                                                  port, host, protocol, null, resolve, reject);

      req.write(dataToSend);
      req.end();
    });
  }

  static patch(path: string, data: any, contentType?: MimeType, port?: number,
               host?: string, protocol?: string): any {
    let dataToSend: string = '';
    if (data) {
      dataToSend = JSON.stringify(data);
    }

    return new Promise((resolve, reject) => {
      const req: ClientRequest = this.makeRequest(path, HttpRequestMethod.Patch, contentType,
                                                  port, host, protocol, null, resolve, reject);

      req.write(dataToSend);
      req.end();
    });
  }  

  static get(path: string, contentType?: MimeType, port?: number,
             host?: string, protocol?: string): any {
    return new Promise((resolve, reject) => {
      const req: ClientRequest = this.makeRequest(path, HttpRequestMethod.Get, contentType,
                                                  port, host, protocol, null, resolve, reject);
      req.end();
    });
  }

  static head(path: string, contentType?: MimeType, port?: number,
              host?: string, protocol?: string): any {
    return new Promise((resolve, reject) => {
      const req: ClientRequest = this.makeRequest(path, HttpRequestMethod.Head, contentType,
                                                  port, host, protocol, null, resolve, reject);
      req.end();
    });
  }

  static delete(path: string, contentType?: MimeType, port?: number,
                host?: string, protocol?: string): any {
    return new Promise((resolve, reject) => {
      const req: ClientRequest = this.makeRequest(path, HttpRequestMethod.Delete, contentType,
                                                  port, host, protocol, null, resolve, reject);
      req.end();
    });
  }

  private static makeRequest(path: string, httpMethod: HttpRequestMethod,
                             contentType: MimeType = MimeType.json, port: number = 8888,
                             host: string = 'localhost', protocol: string = 'http:', headers: any,
                             resolve: any, reject: any): ClientRequest {
    
    let requestHeaders: any = {};
    if (headers) {
      requestHeaders = headers;
    }
    requestHeaders['Content-Type'] = contentType.toString();

    const options: RequestOptions = {
      protocol,
      host,
      port,
      path,
      method: HttpRequestMethod[httpMethod].toUpperCase(),
      headers: requestHeaders };

    const req = request(options, (res) => {
      let rawData: any = '';

      res.on('data', (chunk) => {
        rawData += chunk;
      });

      res.on('error', (error) => {
        reject(error);
      });

      res.on('end', () => {
        if (
          res.headers['content-type'] && 
          res.headers['content-type'].indexOf('application/json') > -1 &&
          rawData && rawData.trim() !== '') {
          rawData = JSON.parse(rawData);
        }
        resolve(rawData);
      });
    });

    return req;
  }
}
