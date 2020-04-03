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

total_order_value - total value has been computed by unit_price multiplied by their quantities. Discounts have been included either to have both dollar amount and percentage discount.

```
total_order_value

Getting the final value with BOTH Percentage and Dollar Discounts:

Quantity * Unit Price = Order Value

Order Value - Dollar Discount = Dollar Discounted Order Value

Percentage Discount Amount / 100 = Percentage Discount

Final:
Dollar Discounted Order Value - (Dollar Discounted Order Value * Percentage Discount)
```

