/* VARIABLES */

// Operators
const ADD = '+';
const SUBTRACT = '-';
const MULTIPLY = '*';
const DIVIDE = '/';

/* FUNCTIONS */

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
 * Calls a function to operate on two numbers.
 *
 * @param {string} operator - The operator that determines the function to call.
 * @param {number} n1 - The first number.
 * @param {number} n2 - The second number.
 */
function operate(operator, n1, n2) {
    switch (operator) {
        case ADD:
            add(n1, n2);
            break;
        case SUBTRACT:
            subtract(n1, n2);
            break;
        case MULTIPLY:
            multiply(n1, n2);
            break;
        case DIVIDE:
            divide(n1, n2);
            break;
    }
}
