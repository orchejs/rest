/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { Server } from 'http';
import { LoadStats } from './load-stats';

export interface OrcheRestResult {
  server: Server;
  stats: LoadStats;
}
