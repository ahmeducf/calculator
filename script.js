const ADD_OPERATOR = "add";
const SUBTRACT_OPERATOR = "subtract";
const MULTIPLY_OPERATOR = "multiply";
const DIVIDE_OPERATOR = "divide";
const MOD_OPERATOR = "mod";

const OPERATORS = {
  [ADD_OPERATOR]: "+",
  [SUBTRACT_OPERATOR]: "-",
  [MULTIPLY_OPERATOR]: "x",
  [DIVIDE_OPERATOR]: "÷",
  [MOD_OPERATOR]: "%",
};

let currentOperator = null;
let firstOperand = "0";
let secondOperand = "";
let lmaoExist = false;

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

  return result.toString();
}

function roundLongDecimals(numberString) {
  if (numberString.length > 10) {
    return (+numberString).toExponential(2);
  }

  return numberString;
}

function populateDisplay(displayDiv, data) {
  displayDiv.textContent = data;
}

function appendDigit() {
  if (lmaoExist) return;

  if (currentOperator === null) {
    if (firstOperand === "0") firstOperand = "";

    firstOperand = firstOperand.concat(e.target.textContent);
    populateDisplay(currentDisplayDiv, roundLongDecimals(firstOperand));
  } else {
    if (secondOperand === "0") secondOperand = "";

    secondOperand = secondOperand.concat(e.target.textContent);
    populateDisplay(currentDisplayDiv, roundLongDecimals(secondOperand));
  }
}

function setOperation() {
  if (lmaoExist) return;

  if (secondOperand === "") {
    currentOperator = e.target.getAttribute("data-operator");
    firstOperand = roundLongDecimals(firstOperand);

    let template = `${firstOperand} ${OPERATORS[currentOperator]}`;

    populateDisplay(lastDisplayDiv, template);
  } else {
    firstOperand = roundLongDecimals(firstOperand);
    secondOperand = roundLongDecimals(secondOperand);

    firstOperand = operate(currentOperator, firstOperand, secondOperand);
    if (!isFinite(firstOperand)) {
      populateDisplay(currentDisplayDiv, "LMAO");
      populateDisplay(lastDisplayDiv, "");
      lmaoExist = true;

      return;
    }

    currentOperator = e.target.getAttribute("data-operator");
    secondOperand = "";
    let template = `${roundLongDecimals(firstOperand)} ${
      OPERATORS[currentOperator]
    }`;

    populateDisplay(lastDisplayDiv, template);
    populateDisplay(currentDisplayDiv, roundLongDecimals(firstOperand));
  }
}

function evaluateExpression() {
  if (currentOperator === null || currentOperator === "" || lmaoExist) return;

  const result = operate(currentOperator, +firstOperand, +secondOperand);
  if (!isFinite(result)) {
    populateDisplay(currentDisplayDiv, "LMAO");
    populateDisplay(lastDisplayDiv, "");
    lmaoExist = true;

    return;
  }

  const template = `${roundLongDecimals(firstOperand)} ${
    OPERATORS[currentOperator]
  } ${roundLongDecimals(secondOperand)} =`;
  populateDisplay(lastDisplayDiv, template);
  populateDisplay(currentDisplayDiv, roundLongDecimals(result));

  currentOperator = null;
  firstOperand = result;
  secondOperand = "";
}

digitButtons.forEach((digit) => digit.addEventListener("click", appendDigit));

operatorButtons.forEach((operator) =>
  operator.addEventListener("click", setOperation)
);

equalButton.addEventListener("click", evaluateExpression);

clearButton.addEventListener("click", (e) => {
  if (lmaoExist) return;

  if (currentOperator === null) {
    firstOperand = firstOperand.slice(0, firstOperand.length - 1);
    populateDisplay(currentDisplayDiv, roundLongDecimals(firstOperand));
  } else {
    secondOperand = secondOperand.slice(0, secondOperand.length - 1);
    populateDisplay(currentDisplayDiv, roundLongDecimals(secondOperand));
  }
});

allClearButton.addEventListener("click", (e) => {
  currentOperator = null;
  firstOperand = "0";
  secondOperand = "";
  lmaoExist = false;

  populateDisplay(currentDisplayDiv, 0);
  populateDisplay(lastDisplayDiv, "");
});

decimalButton.addEventListener("click", (e) => {
  if (currentDisplayDiv.textContent.includes(".") || lmaoExist) return;

  if (currentOperator === null) {
    firstOperand = firstOperand.concat(".");
    populateDisplay(currentDisplayDiv, `${firstOperand}`);
  } else {
    if (secondOperand === "") secondOperand = "0";
    secondOperand = secondOperand.concat(".");
    populateDisplay(currentDisplayDiv, `${secondOperand}`);
  }
});
