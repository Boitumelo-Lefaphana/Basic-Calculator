export type Operation = '+' | '-' | '*' | '/';

export interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operation: Operation | null;
  shouldResetScreen: boolean;
}