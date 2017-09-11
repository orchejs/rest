import { ClassUtils } from '../utils/class.utils';
import { RouterLoader } from '../loaders/router.loader';

export function route(path: string = '') {
  return function (target: object) {
    const className: string = ClassUtils.getClassName(target);
    let routerPath = path;
    if (routerPath === '') {
      routerPath = className.toLowerCase();
    }
    RouterLoader.addRouterConfig(className, routerPath);
  };
}
