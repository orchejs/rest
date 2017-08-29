import { validate } from '../../..';

export interface student {
  @validate()
  name: string;
}
