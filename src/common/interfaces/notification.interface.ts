import { NOTIFICATION_TYPE } from '@common/enums';

export interface INotification {
  id: string;
  message: string;
  description: string;
  type: NOTIFICATION_TYPE;
}
