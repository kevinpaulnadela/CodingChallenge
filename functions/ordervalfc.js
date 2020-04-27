totalOrderVal = (order) => {
  const discountType = order.discounts.map(order => order.type);
  const discountValue = order.discounts.map(order => order.value);

  const orderSubTotal = order.items.reduce((sum, order) => sum + order.unit_price * order.quantity, 0);

  return (discountType.indexOf("PERCENTAGE") > -1) && (discountType.indexOf("DOLLAR") > -1) ? // Item has both Percentage & Dollar discount
    '$' + (orderSubTotal - (discountValue[1] * orderSubTotal / 100 + discountValue[0])).toFixed(2) :

    (discountType.indexOf("DOLLAR") > -1) ? // Item has Dollar discount only
    '$' + (orderSubTotal - discountValue).toFixed(2) :

    (discountType.indexOf("PERCENTAGE") > -1) ? // Item has Percentage discount only
    '$' + (orderSubTotal - discountValue * (orderSubTotal / 100)).toFixed(2) :

    '$' + (orderSubTotal).toFixed(2)  // Item has no discount
}
module.exports = totalOrderVal;