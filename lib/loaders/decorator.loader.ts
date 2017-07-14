import { FileMatcher, FindOptions } from 'file-matcher';

import { PathUtils } from '../utils/path.utils';


export class DecoratorLoader {

  /**
   * Loads the orche decorators, requiring this files, which
   * executes the decorators functions and registers all the paths, 
   * interceptors and errors classes.
   *
   * @returns { Promise<any> }
   * Returns the list of files that were found and required.
   */
  loadDecorators(): Promise<string[]> {
    const fileMatcher = new FileMatcher();

    const criteria: FindOptions = {
      path: PathUtils.appRoot,
      fileFilter: {
        fileNamePattern: [
          '**/*.js',
          '**/*.ts',
          'node_modules/orche/lib/interceptors/**',
          '!decorator.loader*',
          '!node_modules',
          '!typings',
        ],
        // content: /(?=.[^]*__decorate)(?=.[^]*path|interceptor)/i,
        content: /(@path|@interceptor)/i,
      },
      recursiveSearch: true,
    };

    return new Promise(async (resolve, reject) => {
      try {
        const files: string[] = await fileMatcher.find(criteria);

        if (!files || files.length === 0) {
          reject('No Path, Interceptor or Error decorators found!');
        }

        for (let idx = 0; idx < files.length; idx += 1) {
          const file = files[idx];
          require(file);
        }

        resolve(files);
      } catch (error) {
        reject(error);
      }
    });
  }
}
