import { ContentType } from '../interfaces/content-type';

export abstract class Router {
  
  public abstract loadRoutes(app: any, path: string): Promise<any>;  

  protected abstract routeProcessor(target: string, method: Function, methodName: string, 
                                    contentType: ContentType): Function;
}
