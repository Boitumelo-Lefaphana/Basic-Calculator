export function calculate(num1: number, num2: number, operation: string): number {
  switch (operation) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num2 !== 0 ? num1 / num2 : 0;
    default:
      return num2;
  }
}