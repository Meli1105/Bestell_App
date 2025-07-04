let orderList = {
  dishes: [],
  amounts: [],
  prices: [],
  calcPrice: [],
};

function init() {
  renderMenu();
  renderBasketLayout();
  getFromLocalStorage();
  if (orderList.dishes.length > 0) {
    calcOrder();
  }
  responsiveDesignAutomatic();
  responsiveDish();
  windowHeight();
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

  let buttonRef = document.getElementById("button_wrapper");
  buttonRef.innerHTML = "";
  buttonRef.innerHTML = getButtonUpTemplate();
}

function renderBasketLayout() {
  let basketRef = document.getElementById("basket");
  basketRef.innerHTML = "";

  basketRef.innerHTML = getBasketLayout();

  responsiveDish();
}

function renderBasketOrder() {
  let orderItemRef = document.getElementById("order_item");
  let orderSubtotalRef = document.getElementById("subtotal");
  let orderDeliveryRef = document.getElementById("delivery");
  let orderTotalRef = document.getElementById("total");
  orderItemRef.innerHTML = ""; // clear the order item section before adding new items

  for (let indexOrder = 0; indexOrder < orderList.dishes.length; indexOrder++) {
    orderItemRef.innerHTML += getOrderItemTemplate(indexOrder);

    let operatorMinus = document.getElementById(`minus${indexOrder}`);
    let operatorPlus = document.getElementById(`plus${indexOrder}`);
    if (orderList.amounts[indexOrder] === 1) {
      operatorMinus.classList.add("hide");
    }
    if (orderList.amounts[indexOrder] === 20) {
      operatorPlus.classList.add("hide");
    }
  }
  orderSubtotalRef.innerHTML = `${subtotal.toFixed(2)}`;
  orderDeliveryRef.innerHTML = `${delivery.toFixed(2)}`;
  orderTotalRef.innerHTML = `${total.toFixed(2)}`;
}

function saveToLocalStorage() {
  localStorage.setItem("orderedDishes", JSON.stringify(orderList.dishes));
  localStorage.setItem("orderedAmounts", JSON.stringify(orderList.amounts));
  localStorage.setItem("orderedPrices", JSON.stringify(orderList.prices));
  localStorage.setItem(
    "orderedCalcPrices",
    JSON.stringify(orderList.calcPrice)
  );
}

function getFromLocalStorage() {
  let myOrderedDishes = JSON.parse(localStorage.getItem("orderedDishes"));
  let myOrderedAmounts = JSON.parse(localStorage.getItem("orderedAmounts"));
  let myOrderedPrices = JSON.parse(localStorage.getItem("orderedPrices"));
  let myOrderedCalcPrices = JSON.parse(
    localStorage.getItem("orderedCalcPrices")
  );
  if (myOrderedDishes !== null) {
    orderList.dishes = myOrderedDishes;
    orderList.amounts = myOrderedAmounts;
    orderList.prices = myOrderedPrices;
    orderList.calcPrice = myOrderedCalcPrices;
  } else {
    console.log("No saved order");
  }
}

function deleteOrder() {
  orderList.dishes = [];
  orderList.amounts = [];
  orderList.prices = [];
  orderList.calcPrice = [];
  subtotal = 0;
  delivery = 0;
  total = 0;

  saveToLocalStorage();
  renderBasketLayout();
}

function toggleOverlay(index = null) {
  // Open/close overlay
  let overlay = document.getElementById("overlay");
  let orderConfRef = document.getElementById("orderConfirmation");
  orderConfRef.innerHTML = "";

  if (overlay.classList.contains("show")) {
    overlay.classList.remove("show");
  } else if (orderList.dishes.length === 0) {
    overlay.classList.add("show");
    orderConfRef.innerHTML = `<h3>Your cart is empty.<br>
    Please add some dishes to your cart.</h3>`;
  } else if (index !== null && orderList.amounts[index] === 20) {
    overlay.classList.add("show");
    orderConfRef.innerHTML = `<h3>Sorry, you can only order a maximum of 20 portions per dish.</h3>`;
  } else {
    overlay.classList.add("show");
    orderConfRef.innerHTML = `<h3>Thank you for your order! <br>
    We will deliver your food as soon as possible.</h3>`;
  }
}

function confirmOrder() {
  toggleOverlay();
  deleteOrder();
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleShoppingCart() {
  let shoppingCart = document.getElementById("basket_wrapper");
  shoppingCart.classList.toggle("display_hide");
  toggleContentWidth();
  responsiveDish();
}

function toggleContentWidth() {
  let content = document.getElementById("content");
  let headlineImg = document.getElementById("headline_img");

  content.classList.toggle("full_width");
  headlineImg.classList.toggle("full_width_img");
}

let currentScreenSize = getScreenCategory();

function getScreenCategory() {
  if (window.innerWidth <= 480) return "verySmall";
  if (window.innerWidth <= 600) return "small";
  return "large";
}

function responsiveDesignAutomatic() {
  const newScreenSize = getScreenCategory();

  if (newScreenSize !== currentScreenSize) {
    let shoppingCart = document.getElementById("basket_wrapper");
    let content = document.getElementById("content");
    let headlineImg = document.getElementById("headline_img");

    content.classList.remove("full_width");
    headlineImg.classList.remove("full_width_img");

    if (newScreenSize === "verySmall") {
      shoppingCart.classList.add("display_hide");
      content.classList.add("full_width");
      headlineImg.classList.add("full_width_img");
    } else if (newScreenSize === "small") {
      shoppingCart.classList.add("display_hide");
      content.classList.add("full_width");
      headlineImg.classList.add("full_width_img");
    } else {
      shoppingCart.classList.remove("display_hide");
      content.classList.remove("full_width");
      headlineImg.classList.remove("full_width_img");
    }
  }
}

function responsiveDish() {
  const isMobileScreen = window.innerWidth <= 375;
  let shoppingCartShown = document.getElementById("basket_wrapper");
  let dishText = document.querySelectorAll(".dish_text");
  let dishSize = document.querySelectorAll(".dish");

  dishText.forEach((dish) => {
    if (
      isMobileScreen &&
      !shoppingCartShown.classList.contains("display_hide")
    ) {
      dish.classList.add("display_hide");
    } else {
      dish.classList.remove("display_hide");
    }
  });

  dishSize.forEach((dish) => {
    if (
      isMobileScreen &&
      !shoppingCartShown.classList.contains("display_hide")
    ) {
      dish.classList.add("smaller_dish");
    } else {
      dish.classList.remove("smaller_dish");
    }
  });
}

function windowHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

window.addEventListener("resize", () => {
  renderBasketOrder();
  responsiveDesignAutomatic();
  responsiveDish();
  windowHeight();
});
