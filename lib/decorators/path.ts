import { RouteLoader } from '../loaders/route.loader';


export function path(path: string) {
  return function (target: Object) {
    const className: string = target.toString().match(/function ([^(]*)/)[1];
    RouteLoader.addRouterConfig(className, path);
  };
}
