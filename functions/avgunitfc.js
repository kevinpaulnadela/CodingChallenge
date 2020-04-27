avgUnitPrice = (order) => {
  var totalQuantity = order.items.map(order => order.quantity);
  var quantityPrice = order.items.map(order => order.quantity * order.unit_price);

  var rdcquantityPrice = quantityPrice.reduce((prev, curr) => prev + curr, 0);
  var rdctotalQuantity = totalQuantity.reduce((prev, curr) => prev + curr, 0);
  var totalAvg = rdcquantityPrice / rdctotalQuantity;

  // Total Avg unit price
  return "$" + totalAvg.toFixed(2);
}

module.exports = avgUnitPrice;