import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    isFirst: true,
    numbers: "",
    operators: [],
    prevInput: "",
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

  updateDisplay = () => {
    this.setState(state => ({
      history: this.makeHistory(state.numbers, state.operators),
      result: this.getLastNumber(),
    }))
  }

  updateDisplayWithCal = () => {
    this.setState(state => {
      const operators = state.operators
      if (operators.length === 1) {
        return {
          history: this.makeHistory(state.numbers, state.operators),
          calculatedResult: Number(this.getLastNumber()),
          result: Number(this.getLastNumber()),
        }
      }

      switch (operators[operators.length - 2]) {
        case "+":
          return {
            history: this.makeHistory(state.numbers, state.operators),
            calculatedResult: Number(state.calculatedResult) +
              Number(this.getLastNumber()),
            result: Number(state.calculatedResult) +
              Number(this.getLastNumber()),
          }
        case "-":
          return {
            history: this.makeHistory(state.numbers, state.operators),
            calculatedResult: Number(state.calculatedResult) -
              Number(this.getLastNumber()),
            result: Number(state.calculatedResult) -
              Number(this.getLastNumber()),
          }
        case "x":
          return {
            history: this.makeHistory(state.numbers, state.operators),
            calculatedResult: Number(state.calculatedResult) *
              Number(this.getLastNumber()),
            result: Number(state.calculatedResult) *
              Number(this.getLastNumber()),
          }
        case "/":
          return {
            history: this.makeHistory(state.numbers, state.operators),
            calculatedResult: Number(state.calculatedResult) /
              Number(this.getLastNumber()),
            result: Number(state.calculatedResult) /
              Number(this.getLastNumber()),
          }
        case "%":
          return {
            history: this.makeHistory(state.numbers, state.operators),
            calculatedResult: Number(state.calculatedResult) %
              Number(this.getLastNumber()),
            result: Number(state.calculatedResult) %
              Number(this.getLastNumber()),
          }
        default:
          console.log("take care of unhandled button")
          break
      }
    })
  }


  updateResult = (clickedButton) => {
    // if clicked "AC" button
    if (clickedButton === "AC") {
      this.setState({
        isFirst: true,
        numbers: "",
        operators: [],
        prevInput: "",
        history: "",
        result: 0,
        calculatedResult: 0,
      }, this.updateDisplay)
    }

    // if clicked a NUMBER
    else if (!isNaN(clickedButton)) {
      let clickedNumber = clickedButton
      this.setState(state => ({
        numbers: state.numbers.concat(clickedNumber),
      }), this.updateDisplay)
    }

    // if clicked a OPERATOR
    else {
      let clickedOperator = clickedButton
      this.setState(state => ({
        operators: state.operators.concat(clickedOperator),
        numbers: state.numbers.concat(","),
      }), this.updateDisplayWithCal)
    }

  }

  render() {
    return (
      <div className="container mt-5">
        <div className="calculator">
          <Display history={this.state.history}
            result={this.state.result} />
          <ButtonSet updateResult={this.updateResult} />
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
      <div className="display_current-value">
        {props.result}
      </div>
    </div>
  )
}

const ButtonSet = (props) => {
  return (
    <div className="btn btn-group-vertical p-1 button-set">
      {ButtonSet.keys.map((buttonSet, index) =>
        <div key={index} className="btn btn-group p-0">
          {ButtonSet.keys[index].map((button, i) =>
            <Button key={i} updateResult={props.updateResult}
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
      onClick={() => props.updateResult(props.number)}>
      {props.number}
    </button>
  )
}

export default App;
