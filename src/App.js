import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    isFirst: true,
    numbers: [],
    operators: [],
    prevInput: "",
    history: "12 + 35",
    result: 47,
  }

  updateResult = () => {

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
