import './style.css';
import { CalculatorState, Operation } from './types/calculator';
import { calculate } from './utils/calculations';

const state: CalculatorState = {
  currentValue: '0',
  previousValue: '',
  operation: null,
  shouldResetScreen: false
};

function updateDisplay() {
  const display = document.querySelector<HTMLDivElement>('.display')!;
  display.textContent = state.currentValue;
}

function appendNumber(number: string) {
  if (state.shouldResetScreen) {
    state.currentValue = number;
    state.shouldResetScreen = false;
  } else {
    state.currentValue = state.currentValue === '0' ? number : state.currentValue + number;
  }
  updateDisplay();
}

function handleOperation(operation: Operation) {
  if (state.operation !== null) {
    calculate();
  }
  state.previousValue = state.currentValue;
  state.operation = operation;
  state.shouldResetScreen = true;
}

function calculateResult() {
  if (state.operation === null || state.shouldResetScreen) return;

  const num1 = parseFloat(state.previousValue);
  const num2 = parseFloat(state.currentValue);
  const result = calculate(num1, num2, state.operation);

  state.currentValue = result.toString();
  state.operation = null;
  state.shouldResetScreen = true;
  updateDisplay();
}

function clearCalculator() {
  state.currentValue = '0';
  state.previousValue = '';
  state.operation = null;
  state.shouldResetScreen = false;
  updateDisplay();
}

// Setup HTML
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="calculator">
    <div class="display">0</div>
    <div class="buttons">
      <button class="clear">C</button>
      <button class="operator">/</button>
      <button class="operator">*</button>
      <button class="operator">-</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="operator">+</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button class="equals">=</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>0</button>
    </div>
  </div>
`;

// Add event listeners
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent!;
    
    if (value >= '0' && value <= '9') {
      appendNumber(value);
    } else if (['+', '-', '*', '/'].includes(value)) {
      handleOperation(value as Operation);
    } else if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      clearCalculator();
    }
  });
});