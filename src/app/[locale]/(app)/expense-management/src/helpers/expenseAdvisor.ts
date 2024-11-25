import { v4 as uuidv4 } from 'uuid';
import { NOTIFICATION_TYPE } from '@common/enums';
import { IExpense } from '../interfaces';
import { pushNotification } from '@common/redux/features/globalSlice';
import { Dispatch } from '@reduxjs/toolkit';

export const expenseAdvisor = (values: IExpense, dispatch: Dispatch): boolean => {
  const categoryMaxThreshold = values.category.maxThreshold;

  if (!categoryMaxThreshold) return true;

  const thresholdLimit = categoryMaxThreshold.amount * 0.8;
  const expenseAmount = values.price.amount;

  // If the expense amount exceeds the threshold limit
  if (expenseAmount > thresholdLimit) {
    dispatch(
      pushNotification({
        id: uuidv4(),
        type: NOTIFICATION_TYPE.ERROR,
        message: 'Warning: High Expense Amount',
        description: 'This expense exceeds 80% of the category limit. Please reduce the expense amount.',
      }),
    );
    return false;
  }

  // Savings recommendations
  if (expenseAmount > categoryMaxThreshold.amount * 0.6) {
    dispatch(
      pushNotification({
        id: uuidv4(),
        type: NOTIFICATION_TYPE.WARNING,
        message: 'Savings Suggestion',
        description: `You have exceeded 60% of your ${values.category.name} category limit. We recommend considering more affordable alternatives.`,
      }),
    );
  } else if (expenseAmount > categoryMaxThreshold.amount * 0.4) {
    dispatch(
      pushNotification({
        id: uuidv4(),
        type: NOTIFICATION_TYPE.WARNING,
        message: 'Budget Reminder',
        description: "You're approaching half of your budget for this month. Continue to plan your expenses carefully.",
      }),
    );
  } else if (expenseAmount < categoryMaxThreshold.amount * 0.2) {
    dispatch(
      pushNotification({
        id: uuidv4(),
        type: NOTIFICATION_TYPE.WARNING,
        message: 'Budget Reminder',
        description: "You're approaching half of your budget for this month. Continue to plan your expenses carefully.",
      }),
    );
  }

  return true;
};
