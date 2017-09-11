import { FileMatcher, FindOptions } from 'file-matcher';
import { PathUtils } from '../utils/path.utils';

export class DecoratorLoader {
  loadDecorators(): Promise<string[]> {
    const fileMatcher = new FileMatcher();

    const decoratorsRegex = new RegExp(
      ['((?=.[^]*__decorate)', '(?=.[^]*route|interceptor))', '|(@route|@interceptor)'].join(''),
      'i'
    );

    const criteria: FindOptions = {
      path: PathUtils.appRoot,
      fileFilter: {
        fileNamePattern: ['**/*.js', '**/*.ts', '!decorator.loader*', '!node_modules', '!typings'],
        content: decoratorsRegex
      },
      recursiveSearch: true
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
