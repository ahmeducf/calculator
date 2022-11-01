const ADD_OPERATOR = "add";
const SUBTRACT_OPERATOR = "subtract";
const MULTIPLY_OPERATOR = "multiply";
const DIVIDE_OPERATOR = "divide";
const MOD_OPERATOR = "mod";

let currentOperator = null;
let firstOperand = "0";
let secondOperand = "";

const operatorButtons = document.querySelectorAll(".operator");
const digitButtons = document.querySelectorAll(".digit");
const decimalButton = document.querySelector(".decimal");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const allClearButton = document.querySelector(".all-clear");
const currentDisplayDiv = document.querySelector(".display-current");
const lastDisplayDiv = document.querySelector(".display-last");

function add(op1, op2) {
  return op1 + op2;
}

function subtract(op1, op2) {
  return op1 - op2;
}

function multiply(op1, op2) {
  return op1 * op2;
}

function divide(op1, op2) {
  return op1 / op2;
}

function mod(op1, op2) {
  return op1 % op2;
}

function operate(operator, op1, op2) {
  let result;
  if (operator === ADD_OPERATOR) {
    result = add(op1, op2);
  } else if (operator === SUBTRACT_OPERATOR) {
    result = subtract(op1, op2);
  } else if (operator === MULTIPLY_OPERATOR) {
    result = multiply(op1, op2);
  } else if (operator === DIVIDE_OPERATOR) {
    result = divide(op1, op2);
  } else if (operator === MOD_OPERATOR) {
    result = mod(op1, op2);
  }

  return result;
}

function populateDisplay(displayDiv, data) {
  displayDiv.textContent = data;
}

digitButtons.forEach((digit) => digit.addEventListener("click", (e) => {
  if (currentOperator === null) {
    firstOperand = firstOperand.concat(e.target.textContent);
    populateDisplay(currentDisplayDiv, Number(firstOperand));
  } else {
    secondOperand = secondOperand.concat(e.target.textContent);
    populateDisplay(lastDisplayDiv, Number(secondOperand));
  }
}));
