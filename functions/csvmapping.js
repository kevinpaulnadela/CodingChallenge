import * as totalOrder from './totalorder.js'
import * as download from './dlblob.js'

const objectToCsv = function(items) {
    
  // Empty array to push in to CSV
  const csvRows = [];

  // Getting the headers for CSV at comma separated format
  const headers = Object.keys(items[0]);
  csvRows.push(headers.join(','));
  
  // Loop for the rows
  for (const row of items) {
    // Mapping the data into the headers
    const values = headers.map(header => {
      // Forcing the value into string to replace/escape quotes
      const escaped = (''+row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }
  return csvRows.join('\n');
};

export const getReport = async function() {
  // JSON location
   const jsonlUrl = 'https://next.json-generator.com/api/json/get/EJROS4MLu'

  // Get data from browser
   const res = await fetch(jsonlUrl);
   const orders = await res.json();

  // Implicit return on objects for mapped columns
   const order = orders.map(items => ({

    // Get Order ID Column
    order_id: items.order_id,

    // Get Datetime Column
    order_datetime: items.order_date,

    // Get Total Order Value Column
    total_order_value: totalOrder(),

    // Get Average Unit Price Column
    // Get Quantiy * Unit Price / Total of Quantity
    average_unit_price: 
      (function() { 
        var totalQuantity = items.items.map(items => items.quantity)
        var quantityPrice = items.items.map(items => items.quantity * items.unit_price)

        var rdcquantityPrice = quantityPrice.reduce((prev, curr) => prev + curr, 0);
        var rdctotalQuantity = totalQuantity.reduce((prev, curr) => prev + curr, 0);
        var totalAvg = rdcquantityPrice / rdctotalQuantity;
        
        // Total Avg unit price
        return "$" + totalAvg.toFixed(2)
      })(),
    
    // Get Distinct Unit Count Column
    distinct_unit_count:
      (function() {
        var totalPid = items.items.map(items => items.product.product_id)

        // Product IDs to set as a new array
        let pidCount = Array.from(new Set(totalPid))

        // Counting the unique Product IDs
        return pidCount.length
      })(),

    // Get Total Units Count Column
    total_units_count: 
      (function() {
        // Map Quantity object and total the values
        var totalQuantity = items.items.map(items => items.quantity)

        // Total quantity of order
        return totalQuantity.reduce((prev, curr) => prev + curr, 0)
      })(),

    // Get Customer State Column
    customer_state:
      (function() {
        // Get the state object
        var customerState = items.customer.shipping_address.state
        
        // Function to translate the capitalise cased strings into title case format
        function titleCase(str) {
          return str.toLowerCase().split(' ').map(function(word) {
            return word.replace(word[0], word[0].toUpperCase());
          }).join(' ');
        }

        // Customer's State in a title case format
        return titleCase(customerState)
      })()

  }));
  // Function to call
  const csvData = objectToCsv(order);
  download(csvData);
  console.log(csvData);
};
