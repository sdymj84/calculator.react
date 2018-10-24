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
- numbers (string) : 
- operators (array) : 
- history (string) : 
- result (number) : 
- calculatedResult (number) : 
---

## 3. Handle button click event - onButtonClick
### (When user clicks : AC / Numbers / Point / Operators)
- AC : Initiate state values
- Numbers : 
- Point : 
- Operators : 
---

## 4. Update display
- Prevent leading zeros
- Support continuous calculation (1 + 2 + 3 * 4 - 10 / ...)
- 4 main conditions : user clicks Numbers / Operators / Equal / Point
    - Numbers : 
---

## 5. Update display after calculation
- round off to 9 decimal places
---

# Limitation
 - show only 14 digits so large numbers that exeed 14 digits are not supported (I didn't think it's needed for this project level)