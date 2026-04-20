export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
  age: number;
  email?: string;
}

export interface CurrencyRates {
  [key: string]: number;
}

export type CurrencyCode = 'USD' | 'EUR' | 'RUB' | 'KZT' | 'GBP' | 'JPY';