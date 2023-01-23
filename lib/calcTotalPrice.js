export default function calcTotalPrice(cart) {
  // Start how many cents are in the cart at 0
  // tally is the accumulator
  // We loop over each item and tally how many cents each item costs multiplied by how many of each item there are in the cart & all this gets added to the running tally.
  return cart.reduce((tally, cartItem) => {
    // if check because products can be deleted, but they could still be in your cart
    if (!cartItem.product) return tally;
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
}
