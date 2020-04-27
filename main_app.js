const fetch = require("node-fetch");
const objectToCsv = require('./functions/objtocsv');
const customerStates = require('./functions/custstate');
const totalOrderVal = require('./functions/ordervalfc');
const avgUnitPrice = require('./functions/avgunitfc');
const distUnitCount = require('./functions/distunitcountfc');
const totalUnitsCount = require('./functions/totalunitcount');

const getReport = async function () {
  const jsonlUrl = 'https://next.json-generator.com/api/json/get/EJROS4MLu'
  const res = await fetch(jsonlUrl);
  const orders = await res.json();

  // Implicit return on objects for mapped columns
  const orderlines = orders.map(order => ({

    // Get Order ID Column
    order_id: order.order_id,

    // Get Datetime Column
    order_datetime: order.order_date,

    // Get Total Order Value Column
    total_order_value: totalOrderVal(order),

    // Get Average Unit Price Column
    average_unit_price: avgUnitPrice(order),

    // Get Distinct Unit Count Column
    distinct_unit_count: distUnitCount(order),

    // Get Total Units Count Column
    total_units_count: totalUnitsCount(order),

    // Get Customer State Column
    customer_state: customerStates(order)

  }));

  const csvData = objectToCsv(orderlines);

  // Generate CSV File
  (function () {
    var fs = require('fs');
    const readline = require('readline');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // Prompts for user input filename
    rl.question('Please input CSV Filename: ', (filename) => {
      rl.close();
      fs.writeFile(`./csv/${filename}.csv`, csvData, 'utf8', (err) => {
        if (err) {
          console.log('Some error occured - file either not saved or corrupted file saved.');
        } else if (filename === '') {
          console.log('Error! Please give your CSV a filename!');
          rl.clearLine();
          getReport();
        } else {
          console.log(`${filename}.csv has been saved! `);
        }
      });
    });
  })()
  
}

getReport()