let subtotal = 0;
let delivery = 0;
let total = 0;

function updateBasket() {
  saveToLocalStorage();
  calcOrder();
}

function addToBasket(indexDishes, category) {
  let orderedDish = dishes[0][category][indexDishes];
  let existingDishIndex = orderList.dishes.findIndex(
    (dish) => dish === orderedDish.name
  );

  if (existingDishIndex !== -1 && orderList.amounts[existingDishIndex] < 20) {
    orderList.amounts[existingDishIndex] += 1; // increase the amount
    orderList.calcPrice[existingDishIndex] += orderedDish.price; // increase the price
  } else if (orderList.amounts[existingDishIndex] === 20) {
    toggleOverlay(indexDishes);
  } else {
    orderList.dishes.push(orderedDish.name);
    orderList.amounts.push(1);
    orderList.prices.push(orderedDish.price);
    orderList.calcPrice.push(orderedDish.price);
  }
  updateBasket();
}

function decreaseAmount(indexOrder) {
  if (orderList.amounts[indexOrder] > 1) {
    orderList.amounts[indexOrder] -= 1;
    orderList.calcPrice[indexOrder] -= orderList.prices[indexOrder];
    updateBasket();
  } else if (orderList.amounts[indexOrder] === 1) {
    removeFromBasket(indexOrder);
  }
}

function increaseAmount(indexOrder) {
  if (orderList.amounts[indexOrder] < 20) {
    // limit to a maximum of 20
    orderList.amounts[indexOrder] += 1;
    orderList.calcPrice[indexOrder] += orderList.prices[indexOrder];
  }
  updateBasket();
}

function removeFromBasket(indexOrder) {
  orderList.dishes.splice(indexOrder, 1);
  orderList.amounts.splice(indexOrder, 1);
  orderList.prices.splice(indexOrder, 1);
  orderList.calcPrice.splice(indexOrder, 1);

  if (orderList.dishes.length === 0) {
    calcOrder();
  } else {
    calcOrder();
  }
  saveToLocalStorage();
}

function calcOrder() {
  subtotal = 0;
  delivery = 0;
  total = 0;

  for (let indexOrder = 0; indexOrder < orderList.dishes.length; indexOrder++) {
    subtotal += orderList.calcPrice[indexOrder];
    if (subtotal < 35) {
      delivery = 5.5;
    } else {
      delivery = 1.5;
    }
    total = subtotal + delivery;
  }
  renderBasketOrder();
}
