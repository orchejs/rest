import { ClassUtils } from '../utils/class.utils';
import { RouterLoader } from '../loaders/router.loader';


export function path(path: string) {
  return function (target: object) {
    const className: string = ClassUtils.getClassName(target);
    RouterLoader.addRouterConfig(className, path);
  };
}
