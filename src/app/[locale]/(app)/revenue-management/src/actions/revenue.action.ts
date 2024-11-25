'use server';

import { IRevenue } from '../interfaces';

export async function getRevenue<T = IRevenue>() {
  return;
}

export async function listRevenues<T = IRevenue[]>() {
  return;
}

export async function createRevenue<T = IRevenue>(payload: T) {
  return;
}

export async function updateRevenue(revenues: IRevenue[], payload: IRevenue) {
  return;
}

export async function deleteRevenue(revenues: IRevenue[], id: string) {
  return;
}
