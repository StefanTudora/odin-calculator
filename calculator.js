
// Container class for the model logic
class Calculator {

    constructor() {
        this.first = "";
        this.second = "";
        this.op = null;
        // Remove flag, repace with FSM
        this.resFlag = false;
    }

    // Add digits to the operand, take in account if op is set
    addDigit(digit) {
        if (this.resFlag == true) {
            this.first = "";
            this.resFlag = false;
        }
        if (this.op === null) {
            this.first += digit;
        } else {
            this.second += digit;
        }
    }

    // Delete the last digit of the current operand, take in account if op is set
    deleteDigit() {
        if (this.op === null) {
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
        this.resFlag = false;
    }

    // Returns the value of the current expression
    calcExpression() {
        if (this.first === "") {
            return "0";
        }
        let value = Number(parseFloat(this.first).toFixed(2));
        let secondInt = this.second !== "" ? Number(parseFloat(this.second).toFixed(2)) : 0;
        switch(this.op) {
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
                    console.log("Cannot divide by zero!");
                    return value;
                }
                value /= secondInt;
                break;
        }
        return Number(value.toFixed(2));
    }

    getCurrentOperand() {
        if (this.op === null) {
            return this.first;
        }
        return this.second;
    }

    clearModel() {
        this.first = "";
        this.second = "";
        this.op = null;
        this.resFlag = false;
    }

    setFirst(first) {
        this.first = first;
    }
    
    setResultFlag(resFlag) {
        this.resFlag = resFlag;
    }

}


function attachListeners(calcObj) {
    const displayNode = document.querySelector('.display');
    displayNode.innerText = "0";
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
        const currOperand = calcObj.getCurrentOperand();
        displayNode.innerText = currOperand !== "" ? currOperand : "0";
    });
    const eqNode = document.querySelector('.equal');
    eqNode.addEventListener("click", () => {
        const displayValue = calcObj.calcExpression();
        calcObj.clearModel();
        calcObj.setFirst(displayValue);
        calcObj.setResultFlag(true);
        displayNode.innerText = displayValue.toString();
    });
    const clNode = document.querySelector('.clear');
    clNode.addEventListener("click", () => {
        calcObj.clearModel();
        displayNode.innerText = "0";
    });
}


function init() {
    let calcObj = new Calculator();
    attachListeners(calcObj);
}

init();
