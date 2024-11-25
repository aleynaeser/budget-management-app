'use server';

import { IRevenueCategory } from '../interfaces';

export async function getRevenueCategory<T = IRevenueCategory>(id: string) {
  return;
}

export async function listRevenueCategories<T = IRevenueCategory[]>() {
  return;
}

export async function createRevenueCategory<T = IRevenueCategory>(categories: T[], payload: T) {
  return;
}

export async function updateRevenueCategory(categories: IRevenueCategory[], payload: IRevenueCategory) {
  return;
}

export async function deleteRevenueCategory(categories: IRevenueCategory[], id: string) {
  return;
}
