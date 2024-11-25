import { CURRENCY } from '@common/enums';
import { IPrice } from '@common/interfaces';
import * as Yup from 'yup';

export const priceValidationSchema = (name: string = 'Price'): Yup.ObjectSchema<IPrice> => {
  return Yup.object().shape({
    currency: Yup.string().oneOf(Object.values(CURRENCY)).required('Currency is required.'),
    amount: Yup.number().required(`${name} is required.`).min(1, `${name} must be greater than 0.`),
  });
};
