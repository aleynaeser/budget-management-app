'use client';

import { CURRENCY, CURRENCY_SIGN } from '@common/enums';
import { BMConfig } from '@common/config';
import { useFormatter } from 'next-intl';
import { IPrice } from '@common/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { currencyOptions } from '@common/constants';
import { Field, getIn, useFormikContext } from 'formik';
import classNames from 'classnames';
import SelectInput from '../SelectInput';

import './price-input.scss';

interface IPriceInput extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'name'> {
  name: string;
  currencyName: string;
  defaultPrice: number;
  defaultCurrency: CURRENCY;
  readOnly: boolean;
  withCurrency: boolean;
  onChange?: (value: number) => void;
}

export default function PriceInput({
  name = 'price.amount',
  currencyName = 'price.currency',
  defaultPrice,
  defaultCurrency,
  readOnly = false,
  withCurrency = true,
  onChange,
  ...inputProps
}: Partial<IPriceInput>) {
  const formatter = useFormatter();

  const { values, errors, touched, setFieldValue, setFieldTouched } = useFormikContext<{
    [price: string]: IPrice;
  }>();

  const initialSystemCurrency = BMConfig.defaultCurrency;
  const priceValue = getIn(values, name) ?? defaultPrice;
  const currencyValue = getIn(values, currencyName) || (defaultCurrency ?? initialSystemCurrency);
  const hasError = getIn(errors, name) && getIn(touched, name);

  const [enableFormatting, setEnableFormatting] = useState<boolean>(true);
  const [formattedValue, setFormattedValue] = useState<string>();

  const parsePrice = useCallback(
    (amount: number, currency?: string, decimals = 2) => {
      const formettedPrice = formatter.number(amount, {
        ...(currency && { style: 'currency', currency }),
        minimumFractionDigits: 2,
        maximumFractionDigits: decimals,
      });

      return formettedPrice;
    },
    [formatter],
  );

  const formatInputValue = (value: number) => {
    const formattedPrice = parsePrice(value);
    setFormattedValue(formattedPrice === 'NaN' ? '' : formattedPrice);
  };

  useEffect(() => {
    if (priceValue && enableFormatting) {
      formatInputValue(priceValue);
    }
  }, [priceValue, enableFormatting]);

  useEffect(() => {
    if (!priceValue) setFormattedValue('');
  }, [priceValue]);

  return (
    <div className='price-input'>
      <Field
        id={name}
        name={name}
        min='0'
        type={enableFormatting ? 'text' : 'number'}
        value={enableFormatting ? formattedValue : priceValue}
        className={classNames('form-input', { 'has-error': hasError })}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setEnableFormatting(false);
          if (!enableFormatting) setFormattedValue(undefined);
          setFieldTouched(name, false);

          setFieldValue(name, event.target.value);
          setFieldValue(currencyName, currencyValue);
          onChange && onChange(Number(event.target.value));
        }}
        onBlur={async (event: React.FocusEvent<HTMLInputElement>) => {
          setFieldTouched(name, true);
          setEnableFormatting(true);
          enableFormatting && formatInputValue(priceValue);
          inputProps.onBlur?.(event);
        }}
        onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
          setEnableFormatting(false);
          inputProps.onFocus?.(event);
        }}
        {...inputProps}
      />

      {withCurrency &&
        (readOnly ? (
          currencyValue && <div className='default-currency'>{CURRENCY_SIGN[currencyValue as CURRENCY]}</div>
        ) : (
          <SelectInput
            name={currencyName}
            options={currencyOptions}
            className='currency-select'
            getOptionLabel={(option) => option.sign}
            defaultValue={currencyOptions.find((option) => option.id === currencyValue)}
          />
        ))}
    </div>
  );
}
