import { Server } from 'http';
import { LoadStats } from './load-stats';

export interface OrcheRestResult {
  server: Server;
  stats: LoadStats;
}
