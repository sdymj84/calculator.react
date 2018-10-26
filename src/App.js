import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    numbers: "",
    operators: [],
    history: "",
    result: 0,
    calculatedResult: 0,
  }

  getLastNumber = () => {
    const arrNumber = this.state.numbers.split(",")
    if (this.state.numbers.slice(-1) === ",") {
      return arrNumber[arrNumber.length - 2]
    } else {
      return arrNumber.pop()
    }
  }

  makeHistory = (numbers, operators) => {
    for (let operator of operators) {
      numbers = numbers.replace(",", " " + operator + " ")
    }
    return numbers
  }

  fixFloatError = x => {
    return Number(x.toFixed(8).slice(0, 14))
  }

  updateDisplay = () => {
    const lastNumber = this.getLastNumber()
    this.setState(state => ({
      history: this.makeHistory(state.numbers, state.operators),
      result: (lastNumber) ? lastNumber : 0,
    }))
  }

  updateHistory = () => {
    this.setState(state => ({
      history: this.makeHistory(state.numbers, state.operators),
    }))
  }

  updateDisplayWithCal = () => {
    this.setState(state => {
      const operators = state.operators
      const x = Number(state.calculatedResult)
      const y = Number(this.getLastNumber())
      const history = this.makeHistory(state.numbers, state.operators)

      if (operators.length === 1) {
        return {
          history: this.makeHistory(state.numbers, state.operators),
          calculatedResult: y,
          result: y,
        }
      }

      switch (operators[operators.length - 2]) {
        case "+":
          return {
            history: history,
            calculatedResult: this.fixFloatError(x + y),
            result: this.fixFloatError(x + y),
          }
        case "-":
          return {
            history: history,
            calculatedResult: this.fixFloatError(x - y),
            result: this.fixFloatError(x - y),
          }
        case "x":
          return {
            history: history,
            calculatedResult: this.fixFloatError(x * y),
            result: this.fixFloatError(x * y),
          }
        case "/":
          return {
            history: history,
            calculatedResult: this.fixFloatError(x / y),
            result: this.fixFloatError(x / y),
          }
        case "%":
          return {
            history: history,
            calculatedResult: this.fixFloatError(x % y),
            result: this.fixFloatError(x % y),
          }
        default:
          console.log("take care of unhandled button")
          break
      }
    }, () => {
      const operators = this.state.operators
      if (operators[operators.length - 1] === '=') {
        this.setState(state => ({
          numbers: "",
          operators: [],
          history: "",
        }))
      }
    })
  }

  onButtonClick = (clickedButton) => {
    // if clicked "AC" button
    if (clickedButton === "AC") {
      this.setState({
        numbers: "",
        operators: [],
        history: "",
        result: 0,
        calculatedResult: 0,
      }, this.updateDisplay)
    }

    // if clicked a NUMBER
    else if (String(clickedButton).search("[0-9]") >= 0) {
      let clickedNumber = clickedButton
      let currentNumber = 0
      this.setState(state => {
        // to prevent leading zeros in number
        // - convert the last input number to Number from String
        // - and replace it to current last number which is String
        currentNumber = Number(this.getLastNumber() + clickedNumber)
        const arrNumber = state.numbers.split(",")

        if (state.numbers.slice(-1) === ",") {
          return { numbers: state.numbers.concat(clickedNumber) }
        } else {
          arrNumber.pop()
          arrNumber.push(currentNumber)
          return { numbers: arrNumber.toString() }
        }
      }, this.updateDisplay)
    }

    // if clicked a POINT (.)
    else if (clickedButton.search("[.]") >= 0) {
      if (this.getLastNumber().match("[.]")) {
        return
      }
      this.setState(state => ({
        numbers: state.numbers.concat("."),
      }), this.updateDisplay)
    }

    // if clicked a OPERATOR
    else {
      let clickedOperator = clickedButton
      if (this.state.numbers[this.state.numbers.length - 1] === "," &&
        clickedOperator !== "=") {
        this.setState(state => ({
          operators: state.operators.slice(0, -1).concat(clickedOperator)
        }), this.updateHistory)
      } else {
        this.setState(state => ({
          operators: state.operators.concat(clickedOperator),
          // if first input is operator : 
          //   store result in numbers so continue calculation after result
          numbers: (state.numbers === "") ?
            String(state.result).concat(",") :
            (clickedOperator === "=") ? state.numbers : state.numbers.concat(","),
        }), this.updateDisplayWithCal)
      }

    }
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="calculator">
          <Display history={this.state.history}
            result={this.state.result} />
          <ButtonSet onButtonClick={this.onButtonClick} />
        </div>
      </div>
    );
  }
}

const Display = (props) => {
  return (
    <div className="display">
      <div className="display_history">
        {props.history}
      </div>
      <div className={String(props.result).length > 7 ?
        "display_current-value_sm" :
        "display_current-value"}>
        {props.result}
      </div>
    </div >
  )
}

const ButtonSet = (props) => {
  return (
    <div className="btn btn-group-vertical p-1 button-set">
      {ButtonSet.keys.map((buttonSet, index) =>
        <div key={index} className="btn btn-group p-0">
          {ButtonSet.keys[index].map((button, i) =>
            <Button key={i} onButtonClick={props.onButtonClick}
              number={button} className={(i === 0 && (index === 0 || index === 4)) ?
                "button two-button" : "button"} />
          )}
        </div>
      )}
    </div>
  )
}

ButtonSet.keys = [
  ["AC", "%", "/"],
  [1, 2, 3, "x"],
  [4, 5, 6, "-"],
  [7, 8, 9, "+"],
  [0, ".", "="]
]

const Button = (props) => {
  return (
    <button className={props.className}
      onClick={() => props.onButtonClick(props.number)}>
      {props.number}
    </button>
  )
}

export default App;
