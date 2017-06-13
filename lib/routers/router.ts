export abstract class Router {
  public abstract loadRoutes(app: any, path: string): Promise<any>;  
  protected abstract routeExecution(target: string, method: Function, methodName: string): Function;
}
