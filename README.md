# CurrencyExchange

This project use Angular version 15.2.6.
Project created to solve task from interview.

In project I use:

- fastforex API [fastforex](https://www.fastforex.io/), for currency conversion;
- ng-select from this [repo](https://github.com/ng-select/ng-select), for list of currency;

## Task

### Header

- The header should display the current exchange rate (USD, EUR) against the hryvnia (UAH).
- The current exchange rate must come from any public API.

### Component with conversion:

- Each currency should have its own input and select.
- A separate input + select for the first currency, and a separate input + select for the second currency in the input a number is set to indicate the number of units to convert in the select must be at least three currencies - UAH, USD, EUR.
- Conversion must occur in both directions
  when changing the value in the first currency, the value in the second must be recalculated, and vice versa
  when changing the currency in each select, the conversion of both currencies should be recalculated correctly.

### Plus will be:

- Well-designed interface and appearance
- Clean code
