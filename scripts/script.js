let orderList = {
  dishes: [],
  amounts: [],
  prices: [],
  calcPrice: [],
};

function init() {
  renderMenu();
  renderBasketLayout();
}

function renderMenu() {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = ""; // in case of a render function --> empty innerHTML before adding the content, otherwhise the content will be repeated over and over again

  contentRef.innerHTML = getMenuLayout();

  let dishesStarters = document.getElementById("starters");
  let dishesMainCourses = document.getElementById("main_courses");
  let dishesDesserts = document.getElementById("desserts");

  for (
    let indexStarter = 0;
    indexStarter < dishes[0].starters.length;
    indexStarter++
  ) {
    dishesStarters.innerHTML += getStarterTemplate(indexStarter);
  }

  for (
    let indexMainCourse = 0;
    indexMainCourse < dishes[0].mainCourses.length;
    indexMainCourse++
  ) {
    dishesMainCourses.innerHTML += getMainCourseTemplate(indexMainCourse);
  }

  for (
    let indexDessert = 0;
    indexDessert < dishes[0].desserts.length;
    indexDessert++
  ) {
    dishesDesserts.innerHTML += getDessertTemplate(indexDessert);
  }
}

function renderBasketLayout() {
  let basketRef = document.getElementById("basket");
  basketRef.innerHTML = "";

  basketRef.innerHTML = getBasketLayout();
}

function renderBasketOrder() {
  let orderItemRef = document.getElementById("order_item");
  let orderSubtotalRef = document.getElementById("subtotal");
  let orderDeliveryRef = document.getElementById("delivery");
  let orderTotalRef = document.getElementById("total");
  orderItemRef.innerHTML = ""; // clear the order item section before adding new items

  for (let indexOrder = 0; indexOrder < orderList.dishes.length; indexOrder++) {
    orderItemRef.innerHTML += getOrderItemTemplate(indexOrder);
  }
  orderSubtotalRef.innerHTML = `${subtotal.toFixed(2)}`;
  orderDeliveryRef.innerHTML = `${delivery.toFixed(2)}`;
  orderTotalRef.innerHTML = `${total.toFixed(2)}`;
}
