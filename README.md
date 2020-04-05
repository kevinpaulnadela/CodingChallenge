# JSON 2 CSV JS App

A Javascript based app to parse JSON data and outputs into CSV file via clicking Download button.

The generated CSV file has been validated and tested through https://csvlint.io. 

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

Percentage Discount * Order Subtotal / 100 = Percentage Discount Amount

Percentage Discount Amount + Dollar Discount Amount = Total Discount

Final:
Order Subtotal - Total Discount
= Order Total Value

--------------

Getting the final value with Dollar Discounts:

Quantity * Unit Price = Order Value

Final:
Order Value - Dollar Discount
= Dollar Discounted Order Value

--------------

Percentage Discount Amount / 100 = Percentage Discount

Final:
Dollar Discounted Order Value - (Dollar Discounted Order Value * Percentage Discount)
= Percentage Discounted Order Value
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

## Usage (Temporary)

The main app page has been uploaded temporarily to run and generate the CSV. Next changes will be make it to run and generate the CSV via CLI.

```
http://s.catch.com.au/images/edm/codingchallenge/index.html
```