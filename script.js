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
        this.result = 0;
        this.updateDisp();
        
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        this.updateDisp();
    }

    appendInput(number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
        if(this.clearInputAfterEqualsFlag === 1) this.currentOperand = '';
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.clearInputAfterEqualsFlag = 0;
        this.updateDisp();
    }

    chooseOperator(operation) {
        if(this.currentOperand === '') return;
        if(this.pastOperand !== '') this.compute();
        this.operator = operation;
        this.pastOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisp();
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
        this.updateDisp();
    }

    updateDisp() {
        if(Number.isFinite(this.result)) {
            this.currentInputText.innerText = this.formatNumber(this.currentOperand);
        }
        else {
            this.currentInputText.innerText = 'To infinity and beyond';
            this.result = 0;
        }
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
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.innerText);
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
});

clrButton.addEventListener('click', () => {
    calculator.clear();
});

delButton.addEventListener('click', () => {
    calculator.delete();
});

window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            calculator.appendInput(e.key);
            break;
        case '+':
        case '-':
            calculator.chooseOperator(e.key);
            break;
        case '*':
            calculator.chooseOperator('×');
            break;
        case '/':
            calculator.chooseOperator('÷');
            break;
        case 'Enter':
        case '=':
            calculator.compute();
            break;
        case 'Backspace':
            calculator.delete();
            break;
        case 'Escape':
            calculator.clear();
            break;
        default: break;
    }
});