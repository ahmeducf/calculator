let currentOperator = null;
let firstOperand = "0";
let secondOperand = "";

let operatorButtons = document.querySelectorAll(".operator");
let digitButtons = document.querySelectorAll(".digit");
let decimalButton = document.querySelectorAll(".decimal");
let clearButton = document.querySelectorAll(".clear");
let allClearButton = document.querySelectorAll(".all-clear");

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