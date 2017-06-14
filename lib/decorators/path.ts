import { RouterLoader } from '../loaders/router.loader';


export function path(path: string) {
  return function (target: Object) {
    const className: string = target.toString().match(/function ([^(]*)/)[1];
    RouterLoader.addRouterConfig(className, path);
  };
}
