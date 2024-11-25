'use server';

import { IExpense } from '../interfaces';

export async function getExpense<T = IExpense>() {
  return;
}

export async function listExpenses<T = IExpense[]>() {
  return;
}

export async function createExpense<T = IExpense>(payload: T) {
  return;
}

export async function updateExpense(expenses: IExpense[], payload: IExpense) {
  return;
}

export async function deleteExpense(expenses: IExpense[], id: string) {
  return;
}
