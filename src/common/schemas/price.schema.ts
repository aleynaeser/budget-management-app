import { IPrice } from '@common/interfaces';
import * as Yup from 'yup';

export const priceValidationSchema = (name: string = 'Price') => {
    return Yup.object<IPrice>({
      currency: Yup.string().required('Currency is required.'),
      amount: Yup.number()
        .required(`${name} is required.`)
        .min(1, `${name} must be greater than 0.`),
    });
  };
