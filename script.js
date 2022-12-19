const buttons = document.querySelectorAll(".btns-area>div");
// console.log(buttons);

// to convert buttons node list to array we use Array.from() or spread operator or Array.prototype.slice.call()
const buttonsArray = Array.from(buttons);
// console.log(buttonsArray);

const displaySec = document.querySelector(".display");
let displayValue = "";

let operators = ["+", "-", "*", "/"];
let lastOperator = "";

// forEach method is used to iterate over an array and call a function for each element in the array
buttonsArray.forEach((button) => {
  button.addEventListener("click", function () {
    const value = button.innerText;
    // console.log(value);
    displaySec.innerText = value;

    if (value === "AC") {
      displayValue = "";
      display(displayValue);
      return;
    }

    if (value === "C") {
      // slice method is used to extract a part of a string and return the extracted part in a new strin4
      displayValue = displayValue.slice(0, -1);
      display(displayValue);
      return;
    }

    if (operators.includes(value)) {
      lastOperator = value;
      // console.log(lastOperator);

      let lastChar = displayValue[displayValue.length - 1];
      // console.log(lastChar);
      if (operators.includes(lastChar)) {
        displayValue = displayValue.slice(0, -1);
        displayValue += value;
        display(displayValue);
        return;
      }
    }

    if (value === ".") {
      if (lastOperator) {
        const operatorIndex = displayValue.lastIndexOf(lastOperator);
        // console.log(operatorIndex); //098+. --> 3
        const lastNumberSet = displayValue.slice(operatorIndex + 1);
        // console.log(lastNumberSet); //4 --> .
        if (lastNumberSet.includes(".")) return;
      }
      if (!lastOperator && displayValue.includes(".")) return;
    }

    if (value === "=") {
      const lastChar = displayValue[displayValue.length - 1];
      if (operators.includes(lastChar)) {
        displayValue = displayValue.slice(0, -1);
      }
      return total();
    }

    displayValue += value;
    display(displayValue);
  });
});

const display = (str) => {
  displaySec.innerText = str || "0.00";
};

const total = () => {
  const ttl = eval(displayValue);
  displayValue = ttl.toFixed(2).toString();
  display(displayValue);
};
