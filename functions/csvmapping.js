const getReport = async function() {
  // JSON location
  const jsonlUrl = 'https://next.json-generator.com/api/json/get/EJROS4MLu'

  // Get data from browser
  const res = await fetch(jsonlUrl);
  const jsonl = await res.json();

  // Implicit return on objects for mapped columns
  const data = jsonl.map(value => ({

    // Get Order ID Column
    order_id: value.order_id,

    // Get Datetime Column
    order_datetime: value.order_date,

    // Get Total Order Value Column
    total_order_value: 
      (function(){
        // Total of the items multiplied by the quantity
        var quantityPrice = value.items.map(items => items.quantity * items.unit_price).reduce((prev, curr) => prev + curr, 0);
        var dcType = value.discounts.map(items => items.type);
        var dcVal = value.discounts.map(items => items.value);

        // Discounts object have both of Percentage and Dollar discounts
        if ( (dcType.indexOf("PERCENTAGE") > -1) && (dcType.indexOf("DOLLAR") > -1) ) {
          // Getting the Dollar and Percentage Discount Values
          // Dollar Discount Value from dcType Array
          var objdcVal = dcVal[0];
          // Percentage Discount Value from dcType Array
          var objpcVal = dcVal[1];

          var dollardcVal = quantityPrice - objdcVal
          var dcAmount = objpcVal / 100;
          var percentagedcVal = dollardcVal - (dollardcVal * dcAmount);

          // Final computation for Dollar + Percentage
          return "$" + percentagedcVal.toFixed(2);

        // Discounts object have Dollar discount
        } else if (dcType.indexOf("DOLLAR") > -1) {
          var dollardcVal = quantityPrice - dcVal

          // Final computation for Dollar
          return "$" + dollardcVal.toFixed(2);
        
        // Discounts object have Percentage discount
        } else if (dcType.indexOf("PERCENTAGE") > -1) {
          var dcAmount = dcVal / 100;
          var percentagedcVal = quantityPrice - (quantityPrice * dcAmount);

          // Final computation for Percentage
          return "$" + percentagedcVal.toFixed(2);

        // Discounts object is EMPTY
        } else {
          return "$" + quantityPrice.toFixed(2);
        }

      })(),

    // Get Average Unit Price Column
    // Get Quantiy * Unit Price / Total of Quantity
    average_unit_price: 
      (function() { 
        var totalQuantity = value.items.map(items => items.quantity)
        var quantityPrice = value.items.map(items => items.quantity * items.unit_price)

        var rdcquantityPrice = quantityPrice.reduce((prev, curr) => prev + curr, 0);
        var rdctotalQuantity = totalQuantity.reduce((prev, curr) => prev + curr, 0);
        var totalAvg = rdcquantityPrice / rdctotalQuantity;
        
        // Total Avg unit price
        return "$" + totalAvg.toFixed(2)
      })(),
    
    // Get Distinct Unit Count Column
    distinct_unit_count:
      (function() {
        var totalPid = value.items.map(items => items.product.product_id)

        // Product IDs to set as a new array
        let pidCount = Array.from(new Set(totalPid))

        // Counting the unique Product IDs
        return pidCount.length
      })(),

    // Get Total Units Count Column
    total_units_count: 
      (function() {
        // Map Quantity object and total the values
        var totalQuantity = value.items.map(items => items.quantity)

        // Total quantity of order
        return totalQuantity.reduce((prev, curr) => prev + curr, 0)
      })(),

    // Get Customer State Column
    customer_state:
      (function() {
        // Get the state object
        var customerState = value.customer.shipping_address.state
        
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
  const csvData = objectToCsv(data);
  download(csvData);
  console.log(csvData);
};