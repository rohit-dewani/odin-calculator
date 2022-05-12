class Calculator {

    constructor(pastInputText, currentInputText) {
        this.pastInputText = pastInputText;
        this.currentInputText = currentInputText;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.pastOperand = '';
        this.operator = undefined;
        this.clearInputAfterEqualsFlag = 0;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendInput(number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
        if(this.clearInputAfterEqualsFlag === 1) this.currentOperand = '';
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.clearInputAfterEqualsFlag = 0;
    }

    chooseOperator(operation) {
        if(this.currentOperand === '') return;
        if(this.pastOperand !== '') this.compute();
        this.operator = operation;
        this.pastOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        const past = parseFloat(this.pastOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(past) || isNaN(current)) return;
        switch (this.operator){
            case '+':
                this.result = past + current;
                break;
            case '-':
                this.result = past - current;
                break;
            case '×':
                this.result = past * current;
                break;
            case '÷':
                this.result = past / current;
                break;
            default:
                return;
        }
        this.currentOperand = this.result;
        this.operator = undefined;
        this.pastOperand = '';
        this.clearInputAfterEqualsFlag = 1;
    }

    updateDisp() {;
        this.currentInputText.innerText = this.formatNumber(this.currentOperand);
        if(this.operator != null) {
            this.pastInputText.innerText = `${this.formatNumber(this.pastOperand)} ${this.operator}`;
        }
        else {
            this.pastInputText.innerText = '';
        }
    }

    formatNumber(number) {
        const stringNum = number.toString();
        const intDigits = parseFloat(stringNum.split('.')[0]);
        const decimalDigits = stringNum.split('.')[1];
        let intDisplay ;
        if(isNaN(intDigits)) {
            intDisplay = '';
        }
        else {
            intDisplay = intDigits.toLocaleString('en',{maximumFractionDigits: 0})
        }
        if(decimalDigits != null) {
            return `${intDisplay}.${decimalDigits}`;
        }
        else {
            return intDisplay;
        }
    }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const clrButton = document.querySelector('[data-clr]');
const delButton = document.querySelector('[data-del]');
const pastInputText = document.querySelector('[data-past-input]');
const currentInputText = document.querySelector('[data-current-input]');

const calculator = new Calculator(pastInputText, currentInputText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendInput(button.innerText);
        calculator.updateDisp();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.innerText);
        calculator.updateDisp();
    });
});

equalsButton.addEventListener('click', button => {
    calculator.clearInputAfterEqualsFlag = 0;
    calculator.compute();
    calculator.updateDisp();
});

clrButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisp();
});

delButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisp();
});