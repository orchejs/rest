import { RouterUnit } from './router-unit';

export interface RouterConfig {
  path: string;
  className: string;
  routerUnits: RouterUnit[];
}
