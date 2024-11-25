import { IPrice } from "@common/interfaces";

export interface IExpenseCategory {
  id: string;
  name: string;
  colorHexCode: string;
  maxThreshold: IPrice;
}
