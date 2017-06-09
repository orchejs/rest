export abstract class Route {
  protected abstract loadRoutes(app: any, path: string): Promise<any>;  
}
