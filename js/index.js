window.onload = function () {
  let numberElements = document.getElementsByClassName("number");
  let operatorElements = document.getElementsByClassName("main-operator");
  let resultElement = document.getElementById("result");
  let clearElement = document.getElementById("clear");
  let decimalPointElement = document.getElementById("decimal-point");
  let equaleOperatorElement = document.getElementById("equal-operator");
  let resultDisplayed = false;

  addEventListenerToNumbers();
  addEventListenerToOperators();
  addEventListenerToClear();
  addEventListenerToDecimalPoint();
  addEventListenerToEqualOperator();

  function addEventListenerToEqualOperator() {
    equaleOperatorElement.addEventListener("click", function () {
      let strResult = resultElement.value.toString();
      let numbers = resultElement.value.split(/\+|\-|\×|\÷/g);
      let operators = strResult.replace(/[0-9]|\./g, "").split("");

      doDivideOperation(operators, numbers);
      doMultiplyOperation(operators, numbers);
      doAdditionOperation(operators, numbers);
      doSubstractionOperation(operators, numbers);

      result.value = numbers[0];
      resultDisplayed = true;
    });

    function doSubstractionOperation(operators, numbers) {
      let substraction = operators.indexOf("-");
      while (substraction != -1) {
        numbers.splice(
          substraction,
          2,
          numbers[substraction] - numbers[substraction + 1]
        );
        operators.splice(substraction, 1);
        substraction = operators.indexOf("-");
      }
    }

    function doAdditionOperation(operators, numbers) {
      let addition = operators.indexOf("+");
      while (addition != -1) {
        numbers.splice(
          addition,
          2,
          parseFloat(numbers[addition]) + parseFloat(numbers[addition + 1])
        );
        operators.splice(addition, 1);
        addition = operators.indexOf("+");
      }
    }

    function doMultiplyOperation(operators, numbers) {
      let multiplication = operators.indexOf("×");
      while (multiplication != -1) {
        numbers.splice(
          multiplication,
          2,
          numbers[multiplication] * numbers[multiplication + 1]
        );
        operators.splice(multiplication, 1);
        multiplication = operators.indexOf("×");
      }
    }

    function doDivideOperation(operators, numbers) {
      let divide = operators.indexOf("÷");
      while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
      }
    }
  }

  function addEventListenerToDecimalPoint() {
    decimalPointElement.addEventListener("click", function () {
      resultElement.value = resultElement.value + decimalPointElement.innerHTML;
    });
  }

  function addEventListenerToClear() {
    clearElement.addEventListener("click", function () {
      resultElement.value = "";
    });
  }

  function addEventListenerToOperators() {
    for (let operator of operatorElements) {
      operator.addEventListener("click", function () {
        appendOperator(operator);
      });
    }
  }

  function appendOperator(operator) {
    let strResult = resultElement.value.toString();
    if (strResult == "") return;

    let lastCharacter = strResult.substring(strResult.length - 1);
    if (isOperator(lastCharacter))
      resultElement.value = strResult.substring(0, strResult.length - 1) + operator.innerHTML;
    else resultElement.value = strResult + operator.innerHTML;
  }

  function isOperator(ch) {
    return ch == "+" || ch == "-" || ch == "×" || ch == "÷";
  }

  function addEventListenerToNumbers() {
    for (let number of numberElements) {
      number.addEventListener("click", function () {
        appendNumber(number);
      });
    }
  }

  function appendNumber(number) {
    let lastCharacter = resultElement.value.substring(resultElement.value.length-1);
    if (!resultDisplayed || isOperator(lastCharacter))
      resultElement.value = resultElement.value + number.innerHTML;
    else resultElement.value = number.innerHTML;
    resultDisplayed = false;
  }
};