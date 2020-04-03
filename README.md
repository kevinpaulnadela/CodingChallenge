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

total_order_value

```
total_order_value
```

