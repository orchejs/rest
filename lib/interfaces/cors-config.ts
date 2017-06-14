import { CorsOptions } from '../interfaces/cors-options';

export interface CorsConfig {
  corsOptions?: CorsOptions;
  preflight?: boolean;
}
