var inputs = [];
var operators = ["+", "%divide", "÷", "-", "*"]
var tempInput = "";

$("button").click(function() {
  var userInput = $(this).text();
  console.log(tempInput);
  //check if user clicks a number button
  if (!isNaN(userInput) || userInput === ".") {
    tempInput += userInput;
    updateCalcScreen(tempInput);
  } else if (operators.indexOf(userInput) != -1) {
    //if an operator - non-clear or non-equal - is selected, then add the full inputted number & operator to input array.
    inputs.push(parseFloat(tempInput));
    inputs.push(userInput);
    tempInput = "";
  } else if (userInput === "=") {
    //add last input to array and calulate sum
    inputs.push(parseFloat(tempInput));
    var sum = calcSum(inputs);
    //show sum in calculator screen
    updateCalcScreen(sum);
    //reset array so ready to continue calculating if user wants
    inputs = [];
    tempInput = sum;
  } else if (userInput === "CE") {
    //clear last entry
    tempInput = "";
    updateCalcScreen(tempInput);
  } else if (userInput === "AC") {
    //clear all input
    inputs = [];
    tempInput = "";
    updateCalcScreen(tempInput);
  } else if (userInput === "+/-") {
    if (tempInput[0] === "-") {
      tempInput = tempInput.slice(1);
    } else {
      tempInput = "-" + tempInput;
    }
    updateCalcScreen(tempInput);
  }
});

function calcSum(arr) {

  //initialize with first input
  var sum = arr[0];
  //go through and check each operator & perform appropriate action on the current sum +-/* the next input
  for (var i = 1; i < (arr.length - 1); i += 2) {
    console.log(sum);
    if (arr[i] === "+") {
      sum += arr[i + 1];
    } else if (arr[i] === "-") {
      sum -= arr[i + 1];
    } else if (arr[i] === "*") {
      sum *= arr[i + 1];
    } else if (arr[i] === "/" || arr[i] === "÷") {
      sum /= arr[i + 1];
    }
  }
  return sum;
}

function updateCalcScreen(value) {
  $("#calcScreen").val(value);
}