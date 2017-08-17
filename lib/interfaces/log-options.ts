import { FileTransportOptions, ConsoleTransportOptions } from 'winston';

export interface LogOptions {
  enableLog: boolean;
  fileOptions?: FileTransportOptions;
  consoleOptions?:ConsoleTransportOptions;
}
