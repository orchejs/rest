import * as path from 'path';
import { PathUtils } from './path.utils';

export class PackageUtils {
  private package: any;

  constructor() {
    try {
      this.package = require(path.resolve(PathUtils.appRoot, 'package.json'));
    } catch (error) {
      throw new Error('Package.json file not found!');
    }
  }

  public getDescrition(): string {
    return this.package['description'];
  }

  public getDependencyVersion(dependencyName: string): string {
    let dependency: string;

    if (!dependencyName) {
      throw new Error('Dependency name must be informed!');
    }

    if (this.package['dependencies']) {
      dependency = this.package['dependencies'][dependencyName];
    }

    if (!dependency && this.package['devDependencies']) {
      dependency = this.package['devDependencies'][dependencyName];
    }

    return dependency;
  }

  public checkDependencyVersion(dependencyName: string, versionToCheck: string): 'equal' | 'less'
    | 'greater' {

    const version = this.getDependencyVersion(dependencyName);

    if (!version) {
      throw Error('Dependency not found');
    }

    if (version.replace(/\D+/g, '') === versionToCheck.replace(/\D+/g, '')) {
      return 'equal';
    }

    const v1: string[] = version.replace(/[^0-9.]/g, '').split('.');
    const v2: string[] = versionToCheck.replace(/[^0-9.]/g, '').split('.');

    let result: 'less' | 'greater';

    for (let idx = 0; idx <= v1.length; idx += 1) {
      if (Number.parseInt(v2[idx]) > Number.parseInt(v1[idx])) {
        result = 'greater';
        break;
      } else if (Number.parseInt(v2[idx]) < Number.parseInt(v1[idx])) {
        result = 'less';
        break;
      }
    }

    return result;
  }

}
