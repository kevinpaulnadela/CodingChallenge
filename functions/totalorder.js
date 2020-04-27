import * as orders from './csvmapping.js' 

export function totalOrder(){
  const discountType = items.discounts.map(items => items.type);
  const discountValue = items.discounts.map(items => items.value);

  // Total of the items multiplied by the quantity
  const orderSubTotal = items.items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);

  // Items with both dercentage and dollar discounts
  if ( (discountType.indexOf("PERCENTAGE") > -1) && (discountType.indexOf("DOLLAR") > -1) ) {

    return '$' + (orderSubTotal - (discountValue[1] * orderSubTotal / 100 + discountValue[0])).toFixed(2)

  // Items with dollar discount
  } else if (discountType.indexOf("DOLLAR") > -1) {

    return '$' + (orderSubTotal - discountValue).toFixed(2)
  
  // Items with percentage discount
  } else if (discountType.indexOf("PERCENTAGE") > -1) {

    return '$' + (orderSubTotal - discountValue * (orderSubTotal / 100)).toFixed(2)

  // Items with no discount
  } else {

    return '$' + (orderSubTotal).toFixed(2)
  
  }
}