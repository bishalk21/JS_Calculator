const buttons = document.querySelectorAll(".btns-area>div");
// 1. node list to array
const btnArr = Array.from(buttons);

const display = document.querySelector(".display");
let displayStr = "";

let operators = ["+", "-", "*", "/"];
let lastOperator = "";

// 2. Loop through the array of buttons
btnArr.forEach((btn) => {
  // 3. add event listener to each button
  btn.addEventListener("click", () => {
    //4. GET the value of the button
    const btnVal = btn.innerText;
    display.innerText = btnVal; // assign the value to the display

    // 7. clear the display
    if (btnVal === "AC") {
      displayStr = "";
      displayElm();
      return;
    }

    // 8. delete the last character
    if (btnVal === "C") {
      displayStr = displayStr.slice(0, -1);
      displayElm(displayStr);
      return;
    }

    // 9. check if the value is an operator
    if (operators.includes(btnVal)) {
      // assign the value to the lastOperator
      lastOperator = btnVal;
      // check if the last character is an operator
      let lastChar = displayStr[displayStr.length - 1];
      if (operators.includes(lastChar)) {
        // slice the last character
        displayStr = displayStr.slice(0, -1);
        // add the new operator
        displayStr += btnVal;
        displayElm(displayStr);
        return;
      }
    }

    // 10. check if the value is dot (.)
    if (btnVal === ".") {
      // check for the last operator
      if (lastOperator) {
        // get the index of the last operator
        let lastOperatorIndex = displayStr.lastIndexOf(lastOperator);
        // get the string after the last operator
        let strAfterLastOperator = displayStr.slice(lastOperatorIndex + 1);
        // check if the string after the last operator includes dot
        if (strAfterLastOperator.includes(".")) {
          return;
        }
      }
      // check if the display string includes dot
      if (!lastOperator && displayStr.includes(".")) {
        return;
      }
    }

    // 12. check if the value is equal (=)
    if (btnVal === "=") {
      // check if the last character is an operator
      let lastChar = displayStr[displayStr.length - 1];
      if (operators.includes(lastChar)) {
        return;
      }
      total();
      return;
    }

    // 5. store the value in a variable
    displayStr += btnVal;
    // 6. display the value on the screen
    displayElm(displayStr);
  });
});

const displayElm = (str) => {
  display.innerText = str || "0.00";
};

// 11. calculate the value
const total = () => {
  let total = eval(displayStr);
  let totalStr = total.toFixed(2).toString();
  displayElm(totalStr);
};
