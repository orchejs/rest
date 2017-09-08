export interface ValidatorResponse {
  success: boolean;
  message?: string;
  details?: string;
  property?: string;
  value?: any;
}
