import { CURRENCY, THEME_CODES } from '@common/enums';

export const BMConfig = {
  appEnv: '',
  themes: [{ default: true, code: THEME_CODES.LIGHT }, { code: THEME_CODES.DARK }],
  defaultUserPicture: '/assets/images/default-user-picture.png',
  defaultCurrency: CURRENCY.USD,
  expenseMaxThreshold: 0.8,
  notificationDisplayTime: 5000,
};
