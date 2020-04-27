# JSON 2 CSV JS App

A Javascript based app to parse JSON data and outputs into CSV file via NodeJS.

The generated CSV file has been validated and tested through https://csvlint.io. 

## Usage

```
node -r esm main_app.js.
```

## Minor Feature Changes
*App can be run into NodeJS
*App lets you input the filename of the CSV
*Functions have been translated into NodeJS Modules

## Roadblocks
*After Paul reviewed the codes of the first commit, the challenge was making the app run into the Node environment. It was resolved by calling a node module writeFile. I also installed an NPM package node-fetch to eliminate the fetching error from the async function 
*Translation of functions into NodeJS Modules was also a challenge as I was getting an error exporting and importing functions
*After making the functions into modules, calling and executing those that are inside the orders.map function was throwing an error. Many thanks to Phil! What I was missing is the order parameter in calling the function

## Columns and Values Summary

These are the columns that are required to display on the CSV:

| Columns | Values
| :---: | :---: |
| order_id | Numeric Order ID |
| order_datetime | Date and time of the Order |
| total_order_value | Total value of order excluding shipping fee |
| average_unit_price | Average price per unit |
| distinct_unit_count | Unique units in the Order |
| total_units_count | Total of units in the Order |
| customer_state | Customer's state in the shipping address |

### Computations

Computations have been based from my understanding in the description of fields.

**total_order_value** - total value has been computed by unit_price multiplied by their quantities. Discounts have been included either to have both dollar amount and percentage discount.

```
Getting the final value with BOTH Percentage and Dollar Discounts:

Unit Price * Quantity = Order Subtotal

Percentage Discount * Order Subtotal / 100 + Dollar Discount = Total Discount


Final:
Order Subtotal - Total Discount
= Order Total Value

--------------

Getting the final value with Dollar Discounts:

Quantity * Unit Price = Order Subtotal

Final:
Order Value - Dollar Discount
= Order Total Value

--------------
Unit Price * Quantity = Order Subtotal

Percentage Discount * (Order Subtotal / 100) = Percentage Discount Amount

Final:
Order Subtotal - Percentage Discount Amount
= Order Total Value
```

**average_unit_price** - total average unit price has been computed by adding up separately the total quantities, multiplied by units and divided into units again.

```
Quantity * Unit Price = Total Unit Price

Final:
Total Unit Price / Quantity
```

**distinct_unit_count** - all PID's in the order have been collated and placed array to look and count for Unique PID's 

```
Example:
PID = [3793908, 3879592]
Unique Count = 2
```

**total_units_count** - total quantities for all the products in the order

```
(ALL) + Quantity = Total Units Count
```