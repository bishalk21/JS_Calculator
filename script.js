const buttons = document.querySelectorAll(".btn-area>div");
console.log(buttons); // returns a node list of all the buttons
const display = document.querySelector(".display");
console.log(display);

const btnArr = Array.from(buttons); //convert node list to array
console.log(btnArr);

let displayValue = "";
let operators = ["+", "-", "*", "/"];
let lastOperator = "";

const displayElm = (str) => {
  // displayElm is a function that takes a string and displays it on the screen
  display.innerText = str || "0.00";
};

btnArr.forEach((btn) => {
  btn.addEventListener("click", function () {
    const value = btn.innerText;
    // console.log(value);
    displayValue.innerText = value;

    if (value === "AC") {
      displayValue = "";
      displayElm(displayValue);
      return;
    }

    if (value === "C") {
      displayValue = displayValue.slice(0, -1);
      displayElm(displayValue);
      return;
    }

    if (operators.includes(value)) {
      lastOperator = value;
      // console.log(lastOperator);
      let lastChar = displayValue[displayValue.length - 1];
      // console.log(lastChar);
      if (operators.includes(lastChar)) {
        displayValue = displayValue.slice(0, -1);
        displayElm(displayValue);
        return;
      }
    }

    if (value === ".") {
      if (lastOperator) {
        const operatorIndex = displayValue.lastIndexOf(lastOperator);
        const lastNumberSet = displayValue.slice(operatorIndex + 1);
        if (lastNumberSet.includes(".")) {
          console.log("already has a decimal");
          return;
        }
      }
      if (!lastOperator && displayValue.includes(".")) {
        console.log("already has a decimal");
        return;
      }
    }

    if (value === "=") {
      const lastChar = displayValue[displayValue.length - 1];
      if (operators.includes(lastChar)) {
        displayValue = displayValue.slice(0, -1);
      }
      return total();
    }

    displayValue += value;
    console.log(displayValue);
    displayElm(displayValue);
  });
});
const total = () => {
  const prankValue = randomNumber();
  let audio = new Audio(`./Assets/a.wav`);
  prankValue > 0 && audio.play() && (displayValue += prankValue);
  const ttl = eval(displayValue) + prankValue;
  displayValue = ttl.toString();
  displayElm(ttl);
};

const randomNumber = () => {
  const num = Math.ceil(Math.random() * 10);
  return num > 3 ? 0 : num;
};
