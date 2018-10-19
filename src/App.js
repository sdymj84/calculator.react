import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    result: ""
  }

  updateResult = (clickedNumber) => {
    if (!isNaN(clickedNumber)) {
      this.setState(state => ({
        result: parseInt(state.result + String(clickedNumber))
      }))
    } else {
      switch (clickedNumber) {
        case "AC":
          this.setState(state => ({
            result: 0
          }))
          break

        default:
          this.setState(state => ({
            result: state.result + " " + clickedNumber + " "
          }))
          break
      }
    }


  }

  render() {
    return (
      <div className="container mt-5">
        <div className="calculator">
          <Display result={this.state.result} />
          <ButtonSet updateResult={this.updateResult} />
        </div>
      </div>
    );
  }
}

const Display = (props) => {
  return (
    <div className="display">
      {props.result}
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
              number={button} />
          )}
        </div>
      )}
    </div>
  )
}

ButtonSet.keys = [
  ["AC", "?", "%", "?"],
  [1, 2, 3, "x"],
  [4, 5, 6, "-"],
  [7, 8, 9, "+"],
  [0, 0, ".", "="]
]

const Button = (props) => {
  return (
    <button className="button"
      onClick={() => props.updateResult(props.number)}>
      {props.number}
    </button>
  )
}

export default App;
