customerStates = (order) => {
  const customerState = order.customer.shipping_address.state

  // Function to translate the capitalise cased strings into title case format
  function titleCase(str) {
    return str.toLowerCase().split(' ').map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }

  // Customer's State in a title case format
  return titleCase(customerState)
  // return customerState
}

module.exports = customerStates;