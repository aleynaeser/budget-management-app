import { CURRENCY, CURRENCY_SIGN } from '@common/enums';

export const currencyOptions = Object.keys(CURRENCY).map((key) => ({
  id: key,
  name: key,
  sign: CURRENCY_SIGN[key as CURRENCY],
  code: key as CURRENCY,
}));
