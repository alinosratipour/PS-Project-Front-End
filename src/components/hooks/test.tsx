const selectedToppingsList = selectedToppings || [];
const extraToppingsQuantity = calculateToppingsTotal(
  selectedToppingsList,
  numberOfFreeToppings
);

// Calculate extra toppings cost only if there are extra toppings
const extraToppingsCost =
  extraToppingsQuantity > 0
    ? selectedToppingsList.reduce(
        (total, topping) =>
          total +
          ((topping.quantity || 0) > numberOfFreeToppings
            ? (topping.price || 0) * (topping.quantity - numberOfFreeToppings)
            : 0),
        0
      )
    : 0;