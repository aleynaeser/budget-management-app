import { InputHTMLAttributes, useMemo } from 'react';
import { MotionDiv } from '@components/Layout/Motion';
import { getIn, Field, FieldConfig, FormikErrors, FormikValues, ErrorMessage, useFormikContext } from 'formik';
import BMIcon from '@components/BMIcon';
import classNames from 'classnames';

import './form-item.scss';

type TFormLabel = string | { text: string; htmlFor?: string };
type TOmittedFormField = Omit<FieldConfig & InputHTMLAttributes<HTMLInputElement>, 'children'>;

interface IFormItem extends TOmittedFormField {
  name: string;
  label?: TFormLabel;
  itemClassName?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function FormItem({
  type,
  name,
  label,
  itemClassName,
  className,
  children,
  required,
  ...fieldProps
}: IFormItem) {
  const isTextArea = fieldProps.component === 'textarea';
  const { errors, touched } = useFormikContext<FormikValues & FormikErrors<FormikValues>>();

  const isLabelObject = typeof label === 'object';
  const labelContent = isLabelObject ? { label: label.text, htmlFor: label.htmlFor } : { label: label, htmlFor: name };

  const hasError = useMemo(() => getIn(errors, name) && getIn(touched, name), [errors, touched, name]);

  const shakeVariants = (condition: boolean | string | undefined) => ({
    animate: condition && { x: [0, -4, 4, -4, 4, 0] },
    transition: { damping: 10, stiffness: 100, mass: 0.5, duration: 0.6 },
  });

  return (
    <div className={classNames('form-item', { [itemClassName!]: itemClassName, [`${type}-item`]: type })}>
      {label && (
        <label htmlFor={labelContent.htmlFor}>
          {labelContent.label} {required && '*'}
        </label>
      )}

      {children ? (
        children
      ) : (
        <Field
          {...fieldProps}
          id={name}
          name={name}
          type={type || 'text'}
          className={classNames(isTextArea ? 'form-text-area' : 'form-input', {
            [className!]: className,
            [type!]: type,
            'has-error': hasError,
          })}
        />
      )}

      <ErrorMessage name={name}>
        {(errorMessage) => (
          <MotionDiv className='input-error' {...shakeVariants(true)}>
            <BMIcon icon='bm-exclamation-mark' color='5' size='20' />

            <div className='error-message'>{errorMessage}</div>
          </MotionDiv>
        )}
      </ErrorMessage>
    </div>
  );
}
