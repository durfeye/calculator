console.log('Opposed number key is "["')
//getting all documents needed
const mainDisplay = document.querySelector(".mainDisplay");
const actualTask = document.querySelector(".actualTask");
const numberButtons = document.querySelectorAll(".numberButton");
const operatorButtons = document.querySelectorAll(".operatorButton");
const equalsButton = document.querySelector(".equalsButton");
const deleteButton = document.querySelector(".deleteButton");
const resetButton = document.querySelector(".resetButton");
const opposedButton = document.querySelector(".opposedButton");
const percentButton = document.querySelector(".percentButton");
const decimalButton = document.querySelector(".decimalButton");

//declaring start values
let actualOperator = '';
let actualNumber = '';
let nextNumber = '';
let actualResult = '';
let taskNumber = '';
let keyOperator = '';

//after click on number buttons get its text and show it on display and save as data
function numberData(e) {
    actualNumber += e.target.textContent;
    mainDisplay.textContent = actualNumber;
    setActualTask();
}

//after click on operate button get its text and show it on display and save as data
function operatorData(e) {
    if (actualNumber != '' && nextNumber != '') {
        equals();
    }
    else if (actualNumber != '') {
        nextNumber = actualNumber;
        actualNumber = '';
    }
    actualOperator = e;
    setActualTask();

}

//add function
function add(a, b) {
    return a + b;
}

//subtract function
function subtract(a, b) {
    return a - b;
}

//division function
function divide(a, b) {
    return a / b;
}

//multiply function
function multiply(a, b) {
    return a * b;
}

//function which recognizes what operator is now and does task
function equals(a, b) {
    a = Number(nextNumber);
    b = Number(actualNumber);
    if (actualOperator === '+') {
        actualResult = add(a, b);
    }
    else if (actualOperator === '-') {
        actualResult = subtract(a, b);
    }
    else if (actualOperator === '/') {
        if (actualNumber === '0') {
            resetCalculator();
            mainDisplay.textContent = `You can't divide by 0!`;
        }
        else {
            actualResult = divide(a, b);
        }
    }
    else if (actualOperator === 'x') {
        actualResult = multiply(a, b);
    }
    setActualResult();
    setActualTask();
}

numberButtons.forEach((numberButton) => {
    numberButton.addEventListener('click', numberData);
});

operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', (e) => {
        operatorData(e.target.textContent);
    });
});

//equals button runs equals function
equalsButton.addEventListener('click', equals);

//deletes one digit number from display
deleteButton.addEventListener('click', deleteNumber);

//resets all values added
resetButton.addEventListener('click', resetCalculator);

//set actualNumber value on + or -
opposedButton.addEventListener('click', opposedNumber);

//set actualNumber value on + or -
percentButton.addEventListener('click', percentNumber);

//set actualNumber value on + or -
decimalButton.addEventListener('click', decimalNumber);

//set actualNumber value on + or -
window.addEventListener('keydown', keyUse);

//setting actual result and resets actual number to work
function setActualResult() {
    mainDisplay.innerHTML = '<strong>' + actualResult + '</strong>';
    nextNumber = String(actualResult);
    actualNumber = '';
}


//function which sets actual user's task or actual number
function setActualTask() {
    if (actualResult != '') {
        taskNumber = actualResult;
    }
    else {
        taskNumber = nextNumber;
    }
    actualTask.textContent = taskNumber;

    if (nextNumber != '') {
        actualTask.textContent = taskNumber + ' ' + actualOperator + ' ';
    }
}

//functions which deletes last number in actualNumber
function deleteNumber() {
    mainDisplay.textContent = mainDisplay.textContent.toString().slice(0, -1);
    actualNumber = actualNumber.toString().slice(0, -1);
}

//function which reset all calculator settings to ''
function resetCalculator() {
    actualNumber = '';
    nextNumber = '';
    actualOperator = '';
    actualResult = '';
    taskNumber = '';
    mainDisplay.textContent = '';
    actualTask.textContent = '';
}

//function which changes actualNumber to be - or +
function opposedNumber() {
    if (actualNumber === '') {
        mainDisplay.textContent = '';
    }
    else if (actualNumber === '0') {
        mainDisplay.textContent = '0';
    }
    else {
        actualNumber = actualNumber * (-1);
        mainDisplay.textContent = actualNumber;
    }
}

//function which adds ability to operate actualNumber by percents
function percentNumber() {
    actualNumber = (actualNumber / 100);
    mainDisplay.textContent = actualNumber * 100 + '%';
}

//function which user can put decimal number
function decimalNumber() {
    actualNumber = Number(actualNumber);
    if (Number.isInteger(actualNumber)) {
        mainDisplay.textContent = actualNumber + '.';
        actualNumber = actualNumber + '.';
    }
}

//function which makes keys usable
function keyUse(e) {
    if (e.key >= 0 && e.key <= 9) {
        actualNumber += e.key;
        mainDisplay.textContent = actualNumber;
    }
    if (e.key === 'Delete') deleteNumber()
    if (e.key === 'Backspace') resetCalculator()
    if (e.key === '%') percentNumber()
    if (e.key === '/' || e.key === 'x' || e.key === '-' || e.key === '+') operatorData(e.key)
    if (e.key === '=') equals()
    if (e.key === '.') decimalNumber()
    if (e.key === '[') opposedNumber()
}

//tester 
// console.log('act ope ' + actualOperator);
// console.log('act num ' + actualNumber);
// console.log('next num ' + nextNumber);
// console.log('act res ' + actualResult);