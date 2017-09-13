import { Engine } from './';
import { OrcheRestResult } from '../interfaces';

export class HapiEngine extends Engine {
  public loadServer(): Promise<OrcheRestResult> {
    throw new Error('Method not implemented.');
  }

  protected setupSettings(): void {
    throw new Error('Method not implemented.');
  }

  protected setupExtensions(): void {
    throw new Error('Method not implemented.');
  }
}
