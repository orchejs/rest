import { ContentType } from '../interfaces/content-type';

export abstract class Router {
  
  protected app: any;

  constructor(app: any) {
    this.app = app;
  }

  public abstract loadRoutes(path: string): Promise<any>;  

  protected abstract routeProcessor(target: string, method: Function, methodName: string, 
                                    contentType: ContentType): Function;
}
