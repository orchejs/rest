import { MimeType } from '../constants/mimetype';

export interface ContentType {
  request?: MimeType;
  response?: MimeType;
}
