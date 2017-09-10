import { ContentType } from '../interfaces/content-type';
import { LoadRouterStats } from '../interfaces/load-router-stats';

export abstract class Router {
  protected app: any;

  constructor(app: any) {
    this.app = app;
  }

  public abstract loadRoutes(path: string): LoadRouterStats;

  protected abstract routeProcessor(
    target: string,
    method: Function,
    methodName: string,
    contentType: ContentType
  ): Function;
}
