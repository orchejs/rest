import { RouterLoader } from '../loaders/router.loader';


export function path(path: string) {
  return function (target: Object) {
    const className: any = target.toString().match(/(function|class) ([^{(]*)/i)[2].trim();
    RouterLoader.addRouterConfig(className, path);
  };
}
