import * as path from 'path';
import * as appRootPath from 'app-root-path';
import { OrchePrivate } from '../constants/orche-private';

export class PathUtils {
  static appRoot: string = appRootPath.path;
  static appDirName: string = path.basename(appRootPath.path);
  static localConfigFile: string = path.resolve(
    appRootPath.path,
    './'.concat(OrchePrivate.configFile)
  );
}
