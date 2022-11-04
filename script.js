/* Constants */
const ADD_OPERATOR = "add";
const SUBTRACT_OPERATOR = "subtract";
const MULTIPLY_OPERATOR = "multiply";
const DIVIDE_OPERATOR = "divide";
const MOD_OPERATOR = "mod";

const OPERATORS = {
  [ADD_OPERATOR]: "+",
  "+": "+",
  [SUBTRACT_OPERATOR]: "-",
  "-": "-",
  [MULTIPLY_OPERATOR]: "x",
  "*": "x",
  [DIVIDE_OPERATOR]: "÷",
  "/": "÷",
  [MOD_OPERATOR]: "%",
  "%": "%",
};

let currentOperator = null;
let firstOperand = "0";
let secondOperand = "";
let lmaoExist = false;

/* DOM Elements References */
const operatorButtons = document.querySelectorAll(".operator");
const digitButtons = document.querySelectorAll(".digit");
const decimalButton = document.querySelector(".decimal");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const allClearButton = document.querySelector(".all-clear");
const currentDisplayDiv = document.querySelector(".display-current");
const lastDisplayDiv = document.querySelector(".display-last");

/* Functions */
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

// (operator: string, op1: string, op2: string) --> result: string
function operate(operator, op1, op2) {
  let result = null;
  op1 = Number(op1);
  op2 = Number(op2);

  switch (operator) {
    case OPERATORS[ADD_OPERATOR]:
      result = add(op1, op2);
      break;
    case OPERATORS[SUBTRACT_OPERATOR]:
      result = subtract(op1, op2);
      break;
    case OPERATORS[MULTIPLY_OPERATOR]:
      result = multiply(op1, op2);
      break;
    case OPERATORS[DIVIDE_OPERATOR]:
      result = divide(op1, op2);
      break;
    case OPERATORS[MOD_OPERATOR]:
      result = mod(op1, op2);
      break;
    default:
      break;
  }

  return result.toString();
}

function roundLongDecimals(numberString) {
  if (numberString.length > 10) {
    return (+numberString).toPrecision(4);
  }

  return numberString;
}

function populateDisplay(displayDiv, data) {
  displayDiv.textContent = data;
}

function appendDigit(digit) {
  if (lmaoExist) return;

  if (currentOperator === null) {
    if (firstOperand === "0") firstOperand = "";
    firstOperand = firstOperand.concat(digit);

    populateDisplay(currentDisplayDiv, roundLongDecimals(firstOperand));
  } else {
    if (secondOperand === "0") secondOperand = "";
    secondOperand = secondOperand.concat(digit);

    populateDisplay(currentDisplayDiv, roundLongDecimals(secondOperand));
  }
}

function setOperation(operator) {
  if (lmaoExist) return;

  if (secondOperand === "") {
    currentOperator = OPERATORS[operator];
    firstOperand = roundLongDecimals(firstOperand);

    let template = `${firstOperand} ${currentOperator}`;
    populateDisplay(lastDisplayDiv, template);
  } else {
    firstOperand = roundLongDecimals(firstOperand);
    secondOperand = roundLongDecimals(secondOperand);

    firstOperand = operate(currentOperator, firstOperand, secondOperand);
    if (firstOperand === null) return;

    if (!isFinite(Number(firstOperand))) {
      populateDisplay(currentDisplayDiv, "LMAO");
      populateDisplay(lastDisplayDiv, "");
      lmaoExist = true;

      return;
    }

    currentOperator = OPERATORS[operator];
    secondOperand = "";
    let template = `${roundLongDecimals(firstOperand)} ${currentOperator}`;

    populateDisplay(lastDisplayDiv, template);
    populateDisplay(currentDisplayDiv, roundLongDecimals(firstOperand));
  }
}

function evaluateExpression() {
  if (currentOperator === null || secondOperand === "" || lmaoExist) return;

  const result = operate(currentOperator, firstOperand, secondOperand);
  if (result === null) return;

  if (!isFinite(Number(result))) {
    populateDisplay(currentDisplayDiv, "LMAO");
    populateDisplay(lastDisplayDiv, "");
    lmaoExist = true;

    return;
  }

  const op1 = roundLongDecimals(firstOperand);
  const op2 = roundLongDecimals(secondOperand);
  const template = `${op1} ${currentOperator} ${op2} =`;

  populateDisplay(lastDisplayDiv, template);
  populateDisplay(currentDisplayDiv, roundLongDecimals(result));

  currentOperator = null;
  firstOperand = result;
  secondOperand = "";
}

function clearSingleDigit() {
  if (lmaoExist) return;

  if (currentOperator === null) {
    firstOperand = firstOperand.slice(0, firstOperand.length - 1);
    firstOperand = firstOperand === "" ? "0" : firstOperand;

    populateDisplay(currentDisplayDiv, roundLongDecimals(firstOperand));
  } else {
    secondOperand = secondOperand.slice(0, secondOperand.length - 1);

    populateDisplay(currentDisplayDiv, roundLongDecimals(secondOperand));
  }
}

function clearAll() {
  currentOperator = null;
  firstOperand = "0";
  secondOperand = "";
  lmaoExist = false;

  populateDisplay(currentDisplayDiv, 0);
  populateDisplay(lastDisplayDiv, "");
}

function appendDecimal() {
  if (currentDisplayDiv.textContent.includes(".") || lmaoExist) return;

  if (currentOperator === null) {
    firstOperand = firstOperand.concat(".");
    populateDisplay(currentDisplayDiv, `${firstOperand}`);
  } else {
    if (secondOperand === "") secondOperand = "0";
    secondOperand = secondOperand.concat(".");
    populateDisplay(currentDisplayDiv, `${secondOperand}`);
  }
}

function handleKeyboardInput(e) {
  if (!e.shiftKey && e.key >= 0 && e.key <= 9) {
    appendDigit(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    setOperation(e.key);
  } else if (e.keyCode === 56 && e.shiftKey) {
    setOperation("*");
  } else if (e.keyCode === 187 && e.shiftKey) {
    setOperation("+");
  } else if (e.keyCode === 189) {
    setOperation("-");
  } else if (e.keyCode === 53 && e.shiftKey) {
    setOperation("%");
  } else if (e.key === "Enter" || e.key === "=") {
    evaluateExpression();
  } else if (e.key === ".") {
    appendDecimal();
  } else if (e.key === "Backspace") {
    clearSingleDigit();
  } else if (e.key === "Escape") {
    clearAll();
  }
}

/* Event Listeners */
digitButtons.forEach((button) =>
  button.addEventListener("click", (e) =>
    appendDigit(e.target.getAttribute("data-digit"))
  )
);

operatorButtons.forEach((operator) =>
  operator.addEventListener("click", (e) =>
    setOperation(e.target.getAttribute("data-operator"))
  )
);

equalButton.addEventListener("click", evaluateExpression);

clearButton.addEventListener("click", clearSingleDigit);

allClearButton.addEventListener("click", clearAll);

decimalButton.addEventListener("click", appendDecimal);

window.addEventListener("keydown", (e) => handleKeyboardInput(e));
