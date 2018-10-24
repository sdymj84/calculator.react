# calculator.react
### Simple calculator app built with React

# How I've Developed It

## 1. Create UI and frame first 
### (Components : Apps / Button / ButtonSet / Display)
- Apps : Hold most of the methods, store all states as top component. so Button and Display components can share the states
- Button : Each button, clicking button triggers onButtonClick method which is connected all the way down from Apps component by referencing it
- ButtonSet : Actually hold buttons array and props down to Button comp. also places buttons using array.map()
- Display : Receive calculated result, input button and histories with props from Apps comp and display them
---

## 2. State
### (numbers, operators, history, result, calculatedResult)
- numbers (string) : concat newly input number, separate with "," between numbers so it can make array delimit with ','
- operators (array) : push input operator
- history (string) : add numbers and operators > store
- calculatedResult (number) : when clicked operator, store calculated value between previous value and current value
- result (number) : show it to display (either this'd be calculated result or use input value)
---

## 3. Handle button click event (onButtonClick)
### (When user clicks : AC / Numbers / Point / Operators)
- AC : Initiate state values > then updateDisplay
- Numbers : Put numbers into array > replace last number with current number so that prevent leading zeros > then updateDisplay
  - (ex: prev 12,5 > input 6 > current 12,56)
  - (ex: prev 12,0 > input 6 > current 12,6)
- Point : concat '.' unless there's already '.' in numbers > then updateDisplay
- Operators : push new operator to operators state > then updateDisplayWithCal
---

## 4. Update display (updateDisplay)
- Just update current input number and history
---

## 5. Update display after calculation (updateDisplayWithCal)
- Calculate values based on clicked operator and update display
---

## 6. Issues
- Float error 
  - Detail : (0.1 + 0.2 = 0.3000004)
  - Solution : Round off to 9 decimal places > Conver to Number
---

# Limitation
 - show only 14 digits so large numbers that exeed 14 digits are not supported (I didn't think it's needed for this project level)