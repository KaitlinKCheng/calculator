/* PAGE ELEMENTS */

const calcDisplay = document.getElementById('display');
const calcBtns = document.querySelectorAll('.calc-btn');

/* VARIABLES */

// Operators
const ADD = '+';
const SUBTRACT = '-';
const MULTIPLY = '*';
const DIVIDE = '/';

const EQUALS = '=';

let displayVal = 0;
let input = []; // [num1, num2, operator]

/* SETUP */
setup();

/* FUNCTIONS */

/**
 * Sets up the calculator.
 */
function setup() {
    calcBtns.forEach((btn) => {
        btn.addEventListener('click', evaluateBtnPress);
    });

    updateDisplay();
}

/**
 * Determines which type of button was pressed given an event and calls the
 * appropriate function.
 *
 * @param {Event} e - The event that occurred.
 */
function evaluateBtnPress(e) {
    const classes = Array.from(e.target.classList);

    if (classes.indexOf('number') != -1) {
        pressNumber(e);
    } else if (classes.indexOf('operator') != -1) {
        pressOperator(e);
    } else {
        pressOther(e);
    }
}

/**
 * Updates the display text with the number pressed.
 *
 * @param {Event} e - The event that occurred.
 */
function pressNumber(e) {
    if (!+displayVal || input[2] === EQUALS) {
        displayVal = e.target.textContent;
    } else {
        displayVal += e.target.textContent;
    }

    updateDisplay();
}

/**
 * Does calculations on the stored input if the stored input is valid. At least
 * 1 number and 1 operator must be stored before performing a calculation.
 * Current input is also stored for future calculations.
 *
 * @param {Event} e - The event that occurred.
 */
function pressOperator(e) {
    updateDisplay();

    if (!isNaN(displayVal)) {
        if (input[0] === undefined || input[2] === EQUALS) {
            input[0] = +displayVal;
        } else {
            input[1] = +displayVal;

            // Operator must exist before calculation
            if (input[2] !== undefined && input[2] !== EQUALS) {
                calculate();
            }
        }

        input[2] = convertOperator(e.target.id);
        displayVal = 0; // Refresh display
    }
}

/**
 * Executes code based on the type of button that was pressed.
 *
 * @param {Event} e - The event that occurred.
 */
function pressOther(e) {
    switch(e.target.id) {
        case 'equals':
            if (input[2] !== undefined && input[2] !== EQUALS) {
                input[1] = +displayVal;
                calculate();
                input[1] = undefined;
                input[2] = EQUALS;
            }
            break;
        case 'clear':
            displayVal = 0;
            updateDisplay();
            input = [];
            break;
        case 'decimal':
            if (displayVal.toString().indexOf('.') === -1
                    && !isNaN(displayVal)) {
                displayVal += '.';
                updateDisplay();
            }
            break;
        case 'reverse-sign':
            if (!isNaN(displayVal)) {
                displayVal = +displayVal * -1;
                updateDisplay();
            }
            break;
    }
}

/**
 * A helper function that converts operator text to the appropriate symbol
 * (a global constant).
 *
 * @param {string} operatorText - The text describing the operator.
 * @return {string} The global constant with the respective operator symbol.
 */
function convertOperator(operatorText) {
    switch (operatorText.toLowerCase()) {
        case 'add':
            return ADD;
        case 'subtract':
            return SUBTRACT;
        case 'multiply':
            return MULTIPLY;
        case 'divide':
            return DIVIDE;
    }
}

/**
 * Performs necesssary actions to calculate on stored numbers and updates the
 * display with the result.
 */
function calculate() {
    if (input[2] === DIVIDE && input[1] === 0) {
        input = [];
        displayVal = 'Cannot divide by 0';
    } else {
        input[0] = operate(input[0], input[1], input[2]);
        displayVal = input[0];
    }

    updateDisplay();
}

/**
 * Calls a function to operate on two numbers.
 *
 * @param {string} operator - The operator that determines the function to call.
 * @param {number} n1 - The first number.
 * @param {number} n2 - The second number.
 */
 function operate(n1, n2, operator) {
    switch (operator) {
        case ADD:
            return add(n1, n2);
        case SUBTRACT:
            return subtract(n1, n2);
        case MULTIPLY:
            return multiply(n1, n2);
        case DIVIDE:
            return divide(n1, n2);
    }
}

/**
 * Adds two numbers.
 *
 * @param {number} n1 - The first number.
 * @param {number} n2 - The second number.
 * @return {number} The sum of the numbers.
 */
function add(n1, n2) {
    return n1 + n2;
}

/**
 * Subtracts two numbers.
 *
 * @param {number} n1 - The first number.
 * @param {number} n2 - The second number.
 * @return {number} The difference of the numbers.
 */
function subtract(n1, n2) {
    return n1 - n2;
}

/**
 * Multiplies two numbers.
 *
 * @param {number} n1 - The first number.
 * @param {number} n2 - The second number.
 * @return {number} The product of the numbers.
 */
function multiply(n1, n2) {
    return n1 * n2;
}

/**
 * Divides two numbers.
 *
 * @param {number} n1 - The first number.
 * @param {number} n2 - The second number.
 * @return {number} The quotient of the numbers.
 */
function divide(n1, n2) {
    return n1 / n2;
}

/**
 * Updates the calculator's display with the current stored display value.
 */
function updateDisplay() {
    if (displayVal.toString().length >= 10 && !isNaN(displayVal)) {
        calcDisplay.textContent = parseFloat(displayVal).toExponential(6);
    } else {
        calcDisplay.textContent = displayVal;
    }
}
