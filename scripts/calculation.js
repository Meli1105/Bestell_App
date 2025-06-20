let subtotal = 0;
let delivery = 0;
let total = 0;

function addToBasket(indexDishes, category) {
  let orderedDish = dishes[0][category][indexDishes];

  if (orderList.dishes.findIndex((dish) => dish === orderedDish.name) !== -1) {
    orderList.amounts[orderList.dishes.indexOf(orderedDish.name)] += 1; // increase the amount
    orderList.calcPrice[orderList.dishes.indexOf(orderedDish.name)] +=
      orderedDish.price; // increase the price
  } else {
    orderList.dishes.push(orderedDish.name);
    orderList.amounts.push(1);
    orderList.prices.push(orderedDish.price);
    orderList.calcPrice.push(orderedDish.price);
  }
  calcOrder();
  renderBasketOrder();
  saveToLocalStorage();
}

function decreaseAmount(indexOrder) {
  if (orderList.amounts[indexOrder] > 1) {
    orderList.amounts[indexOrder] -= 1;
    orderList.calcPrice[indexOrder] -= orderList.prices[indexOrder];
  }
  calcOrder();
  renderBasketOrder();
  saveToLocalStorage();
}

function increaseAmount(indexOrder) {
    if (orderList.amounts[indexOrder] < 20) { // limit to a maximum of 20
  orderList.amounts[indexOrder] += 1;
  orderList.calcPrice[indexOrder] += orderList.prices[indexOrder];
  }
  calcOrder();
  renderBasketOrder();
  saveToLocalStorage();
}

function removeFromBasket(indexOrder) {
  orderList.dishes.splice(indexOrder, 1);
  orderList.amounts.splice(indexOrder, 1);
  orderList.prices.splice(indexOrder, 1);
  orderList.calcPrice.splice(indexOrder, 1);

  if (orderList.dishes.length === 0) {
    calcOrder();
    renderBasketLayout();
  } else {
    calcOrder();
    renderBasketOrder();
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
