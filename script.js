const expression = document.getElementById("expression");
const operands = document.getElementById("operands");
const buttons = document.querySelectorAll("button");
let expr = "";
let first = "";
let second = "";
let operatorFlag = 0;
let resultFlag = 0;
let resultOperator = "";
buttons.forEach((btn) => {
  btn.setAttribute("onclick", "btnclick(this)");
});

function btnclick(e) {
  let pressedbtn = e.textContent;
  if (e.className == "clear-button") {
    if (pressedbtn === "AC") {
      expression.textContent = 0;
      operands.textContent = 0;
      expr = "";
      first = "";
      second = "";
      operatorFlag = 0;
      resultOperator = "";
    } else if (pressedbtn === "CE") {
      if (expression.textContent) {
        expr = expression.textContent.slice(
          0,
          expression.textContent.length - 1
        );
        expression.textContent = expr;
      }
    } else {
      console.log("percentage button");
    }
  } else if (e.className == "num") {
    numHandler(e);
  } else {
    operateHandler(e);
  }
}

function numHandler(numbutton) {
  if (operatorFlag === 0) {
    if (numbutton.textContent === "+/-") {
      expr += numbutton.textContent.slice(-1);
      expression.textContent = expr;
    } else {
      expr += numbutton.textContent;
      expression.textContent = expr;
    }
  }
  if (operatorFlag === 1) {
    if (numbutton.textContent === "+/-") {
      // second += numbutton.textContent.slice(-1);
      expr += numbutton.textContent.slice(-1);
      expression.textContent = expr;
      resultOperator = numbutton.textContent.slice(-1);
    } else {
      second += numbutton.textContent;
      expr += numbutton.textContent;
      expression.textContent = expr;
    }
  }
}

// What to do if any operation button is clicked
function operateHandler(oprateButton) {
  operatorFlag = 1;
  let operator = oprateButton.textContent;
  first = expr;
  if (operator !== "=") {
    {
      resultOperator = operator;
      expr += resultOperator;
      expression.textContent = expr;
    }
  } else {
    if (first.length && second.length) {
      resultFlag = 1;
      calculate(first, second, resultOperator);
    }
  }
}

// Function Calculator Logic
function calculate(firstOperand, secondOperand, operator) {
  firstOperand = parseFloat(firstOperand);
  secondOperand = parseFloat(secondOperand);
  let result = "";
  if (operator === "+") {
    result = firstOperand + secondOperand;
  } else if (operator === "-") {
    result = firstOperand - secondOperand;
  } else if (operator === "x") {
    result = firstOperand * secondOperand;
  } else result = firstOperand / secondOperand;
  first = Math.round((result + Number.EPSILON) * 100) / 100;
  expression.textContent += "=";
  operands.textContent = first;
  expr = "" + first;
  second = "";
}
