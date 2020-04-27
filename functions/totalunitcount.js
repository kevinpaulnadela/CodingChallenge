totalUnitsCount = (order) => {
  // Map Quantity object and total the values
  const totalQuantity = order.items.map(order => order.quantity);

  // Total quantity of order
  return totalQuantity.reduce((prev, curr) => prev + curr, 0);
 }
 module.exports = totalUnitsCount;