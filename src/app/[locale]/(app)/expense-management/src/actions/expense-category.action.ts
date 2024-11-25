'use server';

import { IExpenseCategory } from '../interfaces';

export async function getExpenseCategory<T = IExpenseCategory>(id: string) {
  return;
}

export async function listExpenseCategories<T = IExpenseCategory[]>() {
  return;
}

export async function createExpenseCategory<T = IExpenseCategory>(categories: T[], payload: T) {
  return;
}

export async function updateExpenseCategory(categories: IExpenseCategory[], payload: IExpenseCategory) {
  return;
}

export async function deleteExpenseCategory(categories: IExpenseCategory[], id: string) {
  return;
}
