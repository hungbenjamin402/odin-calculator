let storedNumbers = []
let clickedNumbers = 0
let clickedOperators = []
let numberDigits = 1

function createElement(tags, className = '', content = '', style = '') {
    const element = document.createElement(tags);
    if (className) {
        element.classList.add(className);
    }
    if (content) {
        element.textContent = content;
    }
    if (style) {
        element.setAttribute('style', style);
    }
    return element;
}

// function clickNumber(num) {
//     let clickedNumbersLength = clickedNumbers.length;

//     if (numberDigits === 1) {
//         transformNum = 1*num
//         clickedNumbers.splice(clickedNumbersLength-1, 1, transformNum);
//         numberDigits *= 10
//     }
//     else { 
//         transformNum = clickedNumbers[clickedNumbersLength-1] * numberDigits
//         transformNum += num
//         clickedNumbers.splice(clickedNumbersLength-1, 1, transformNum);
//     }

//     console.log(clickedNumbers)
// }

function clickNumber(num) {
    if (numberDigits === 1) {
        clickedNumbers = 1*num
        numberDigits *= 10
    }
    else { 
        transformNum = (clickedNumbers * numberDigits) + num
        clickedNumbers = transformNum
    }

    console.log(clickedNumbers)
}

function clickOperator(operator) {
    let clickedOperatorsLength = clickedOperators.length;
    let storedNumbersLength = storedNumbers.length;

    clickedOperators.splice(clickedOperatorsLength, 0, operator);
    storedNumbers.splice(storedNumbersLength, 0, clickedNumbers)

    clickedNumbers = 0
    numberDigits = 1

    console.log('Stored number arr: ', storedNumbers)
    console.log(clickedOperators)
}

function clickEqual() {
    let totalValue = 0;
    let storedNumbersLength = storedNumbers.length;
    let clickedOperatorsLength = clickedOperators.length;
    let indexOperator = 0;

    console.log('Clicked Operators Length:', clickedOperatorsLength);

    storedNumbers.splice((storedNumbers.length), 0, clickedNumbers)

    console.log('Stored Numbers Length:', storedNumbers.length);
    
    for (let i = 0; i < (storedNumbers.length); i += 2) {
        indexOperator = i;
        
        if (indexOperator != 0) { indexOperator -= 1; }
        
        totalValue += calculateTwoNums(storedNumbers[i], storedNumbers[i + 1], clickedOperators[indexOperator]);
        
        if ((storedNumbers.length) % 2 !== 0 && (i + 3) == storedNumbers.length) {
            totalValue += calculateTwoNums(0, storedNumbers[(storedNumbers.length)-1], clickedOperators[clickedOperatorsLength-1]);
            break;
        }
    }

    console.log('Total value: ', totalValue);
    console.log('Index Operator:', indexOperator);
    console.log('Stored number arr: ', storedNumbers)

    display(totalValue)
    clearArr();
}

function clickClear() {
    var element = document.querySelector('.display_interactive');
    if (element) {
        element.innerHTML = '';  // Clears all content inside the div
    }
}

function calculateTwoNums(num1, num2, operator) {
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        default:
            throw new Error("Unsupported operator");
    }
}

const clearArr = function() {
    storedNumbers = []
    clickedOperators = []
    clickedNumbers = 0
    numberDigits = 1
};

function display(element) {
    const displayInteractiveSelector = document.querySelector(".display_interactive")
    let element_display = createElement('h1', 'num_display', `${element}`, undefined);
    if (!bodySelector) {
        displayInteractiveSelector.append(element_display)
    }
    displayInteractiveSelector.append(element_display);
}

const bodySelector = document.querySelector("#body")
