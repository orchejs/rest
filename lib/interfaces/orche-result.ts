import { Server } from 'http';

import { LoadStats } from './load-stats';


export interface OrcheResult {

  server: Server;
  stats: LoadStats;

}
