/**
 * @license
 * Copyright Mauricio Gemelli Vigolo.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
export type CustomOrigin = (
  requestOrigin: string,
  callback: (err: Error | null, allow?: boolean) => void
) => void;

export interface CorsOptions {
  origin?: boolean | string | RegExp | string[] | RegExp[] | CustomOrigin;
  methods?: string | string[];
  allowedHeaders?: string | string[];
  exposedHeaders?: string | string[];
  credentials?: boolean;
  maxAge?: number;
  preflightContinue?: boolean;
  optionsSuccessStatus?: number;
}
