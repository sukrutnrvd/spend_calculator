import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  locale: string;
}

export interface Person {
  id: string;
  name: string;
  iban: string;
  expenses: number;
}

export interface ExpenseCalculation {
  from: string;
  to: string;
  amount: number;
}

export interface CalculationResult {
  totalExpense: number;
  averagePerPerson: number;
  transfers: ExpenseCalculation[];
}
