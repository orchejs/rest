import { Routes } from '../routes';

export function path(path: string) {
  return function (target: Object) {
    const className: string = target.toString().match(/function ([^(]*)/)[1];
    Routes.addRouterConfig(className, path);
  };
}
