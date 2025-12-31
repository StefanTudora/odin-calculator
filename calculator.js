
// Container class for the logic
class Calculator {

    constructor() {
        this.first = "";
        this.second = "";
        this.op = null;
    }

    // Complent the operand, take in account if op is set
    addDigit(digit) {
        if (op === null) {
            this.first += digit;
        } else {
            this.second += digit;
        }
    }

    // Delete the last digit of the current operand, take in account if op is set
    deleteDigit() {
        if (op === null) {
            if (this.first !== "") {
                this.first = this.first.slice(0, -1);
            }
        } else {
            if (this.second !== "") {
                this.second = this.second.slice(0, -1);
            }
        }
    }

    setOperator(op) {
        this.op = op;
    }

    // Returns the value of the current expression
    calcExpression() {
        if (this.first === "") {
            return "0";
        }
        let value = parseInt(this.first);
        if (this.second === "") {
            return value;
        }
        let secondInt = parseInt(this.second);
        switch(op) {
            case "+":
                value += secondInt;
                break;
            case "-": 
                value -= secondInt;
                break;
            case "*":
                value *= secondInt;
                break;
            case "/": 
                if (secondInt === 0) {
                    // Print error message and return
                    return value;
                }
                value /= secondInt;
                break;
        }
        return value;
    }

    getCurrentOperand() {
        if (this.first === null) {
            return this.first;
        }
        return this.second;
    }

    clearMode() {
        this.first = null;
        this.second = null;
        this.op = null;
    }
}


function attachListeners(calcObj) {
    const displayNode = document.querySelector('.display');
    const digitNodes = document.querySelectorAll('.digit');
    digitNodes.forEach(digitElement => {
        digitElement.addEventListener("click", () => {
            calcObj.addDigit(digitElement.innerText);
            displayNode.innerText = calcObj.getCurrentOperand();
        });
    });
    const opNodes = document.querySelectorAll('.operator');
    opNodes.forEach(op => {
        op.addEventListener("click", () => {
            calcObj.setOperator(op.innerText);
        });
    })
    const delNode = document.querySelector('.delete');
    delNode.addEventListener("click", () => {
        calcObj.deleteDigit();
        displayNode.innerText = calcObj.getCurrentOperand();
    });
    const eqNode = document.querySelector('.equal');
    eqNode.addEventListener("click", () => {
        const dispayValue = calcObj.calcExpression();
        calcObj.clearModel();
        displayNode.innerText = dispayValue;
    });
}


function init() {
    let calcObj = new Calculator();
    attachListeners(calcObj);
}
