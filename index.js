class Calculator {
    constructor(currentArgumentTextElement, previousArgumentTextElement) {
        this.currentArgumentTextElement = currentArgumentTextElement
        this.previousArgumentTextElement = previousArgumentTextElement
        this.allClear()
}

allClear() {
    this.currentArgument = ''
    this.previousArgument = ''
    this.operation = undefined
}

clear() {
    this.currentArgument = this.currentArgument.toString().slice(0, -1)
}

appendNumber(number) {
    if (number === '.' && this.currentArgument.includes('.')) return
    this.currentArgument = this.currentArgument.toString() + number.toString()
}

chooseOperation(operation) {
        if (this.currentArgument === '') return
        if (this.previousArgument !== '') {
          this.compute()
        }
        this.operation = operation
        this.previousArgument = this.currentArgument
        this.currentArgument = ''
    }

compute() {
    let computation
    const prev = parseFloat(this.previousArgument)
    const current = parseFloat(this.currentArgument)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentArgument = computation
    this.operation = undefined
    this.previousAcurrentArgument = ''
}

getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }



updateDisplay() {
        this.currentArgumentTextElement.innerText =
            this.getDisplayNumber(this.currentArgument)
        if (this.operation !=null) {
            this.previousArgumentTextElement.innerText = 
            `${this.getDisplayNumber(this.previousArgument)} ${this.operation}` 
        } else {
            this.previousArgumentTextElement.innerText = ''
        }
    }
}  



const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const allClearButton = document.querySelector('[data-all-clear]')
const currentArgumentTextElement = document.querySelector('[data-current-argument]')
const previousArgumentTextElement = document.querySelector('[data-previous-argument]')

const calculator = new Calculator(currentArgumentTextElement, previousArgumentTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
        console.log(button.innerText)
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute(
        calculator.updateDisplay()
    )
})

allClearButton.addEventListener('click', button => {
    calculator.allClear(
        calculator.updateDisplay()
    )
})

clearButton.addEventListener('click', button => {
    calculator.clear(
        calculator.updateDisplay()
    )
})