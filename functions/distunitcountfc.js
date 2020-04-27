distUnitCount = (order) => {
  var totalPid = order.items.map(order => order.product.product_id);

  // Product IDs to set as a new array
  let pidCount = Array.from(new Set(totalPid));

  // Counting the unique Product IDs
  return pidCount.length;
}
module.exports = distUnitCount;