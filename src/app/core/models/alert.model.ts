export interface AlertInfo {
  fadeOut: boolean;
  message: string;
  color: AlertColor;
}

export type AlertColor =
  | 'alert-primary'
  | 'alert-secondary'
  | 'alert-success'
  | 'alert-danger'
  | 'alert-warning'
  | 'alert-info'
  | 'alert-light'
  | 'alert-dark';
