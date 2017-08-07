import * as path from 'path';
import * as appRootPath from 'app-root-path';

import { OrcheNames } from '../constants/orche-names';

export class PathUtils {

  static appRoot: string = appRootPath.path;
  static appDirName: string = path.basename(appRootPath.path);
  static localConfigFile: string = path.resolve(appRootPath.path, './'
    .concat(OrcheNames.configFile));

  /**
   * Makes the url sanitation, in other words, this function includes the beginning slash
   * and removes the ending slash, if not existent and existent respectively.
   */
  static urlSanitation(url: string): string {
    let finalUrl = url;

    if (!finalUrl || finalUrl.trim().length === 0) {
      return '/';
    } else if (url.length === 1 && url === '/') {
      return finalUrl;
    }

    // Beginning url sanitation
    if (!url.match(/^\//)) {
      finalUrl = '/' + url;
    }
    // Ending url sanitation
    if (url.match(/\/$/)) {
      finalUrl = url.substr(0, (url.length - 1));
    }

    return finalUrl;
  }

  static getSortFields() : 

}
