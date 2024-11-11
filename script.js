// script.js

let currentInput = '';  // To store the current input from the user
let operator = '';      // To store the current operator
let previousInput = ''; // To store the previous number before an operator is applied

// History array to store the last 5 results
let history = [];

// Function to append a number to the display
function appendNumber(number) {
    currentInput += number;
    updateDisplay(currentInput);
}

// Function to append an operator
function appendOperator(op) {
    if (currentInput === '') return; // Prevent appending operator if no number is entered
    previousInput = currentInput;
    currentInput = '';
    operator = op;
    updateDisplay(operator);
}

// Function to clear the display
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay('');
}

// Function to calculate the result
function calculateResult() {
    if (previousInput === '' || currentInput === '') return; // Prevent calculation if inputs are missing

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                result = 'Error';  // Avoid division by zero
            } else {
                result = prev / current;
            }
            break;
        default:
            return;
    }

    // Store the result in history and update the display
    storeHistory(`${previousInput} ${operator} ${currentInput} = ${result}`);
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
}

// Function to update the display of the calculator
function updateDisplay(value) {
    document.getElementById('display').value = value;
}

// Function to store calculation history (only the last 5 results)
function storeHistory(entry) {
    // Add new entry at the start of the history array
    history.unshift(entry);

    // Keep the history array to a maximum of 5 entries
    if (history.length > 5) {
        history.pop();
    }

    // Update the history list display
    updateHistory();
}

// Function to update the history display
function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = ''; // Clear current history list

    // Populate the history list with entries
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}
