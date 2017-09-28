/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
export interface ExpressSettings {
  caseSentiveRouting?: boolean;
  env?: string;
  etag?: any;
  jsonpCallbackName?: string;
  jsonReplacer?: any;
  jsonSpaces?: any;
  queryParser?: any;
  strictRouting?: boolean;
  subdomainOffset?: number;
  trustProxy?: any;
  views?: any;
  viewCache?: boolean;
  viewEngine?: string;
  xPoweredBy?: boolean;
}
