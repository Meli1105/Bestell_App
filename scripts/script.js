let orderList = {
  dishes: [],
  amounts: [],
  prices: [],
};

function init() {
  renderMenu();
  renderBasket();
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

function renderBasket() {
  let basketRef = document.getElementById("basket");
  basketRef.innerHTML = "";

  basketRef.innerHTML = getBasketLayout();
}

function addToBasket(indexDishes, category) {
  let orderItemRef = document.getElementById("order_item");
  orderItemRef.innerHTML = ""; // clear the order item section before adding new items

  let orderedDish = dishes[0][category][indexDishes];

  orderList.dishes.push(orderedDish.name);
  orderList.amounts.push(1); // ACHTUNG: Hier muss noch etwas geändert werden
  orderList.prices.push(orderedDish.price);

  console.table(orderList);

  for (let indexOrder = 0; indexOrder < orderList.dishes.length; indexOrder++) {
  orderItemRef.innerHTML += getOrderItemTemplate(indexOrder);
};
}