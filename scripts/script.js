let orderList = {
  dishes: [],
  amounts: [],
  prices: [],
  calcPrice: [],
};

let dishSize = document.querySelectorAll(".dish");

function init() {
  windowHeight();
  renderMenu();
  renderBasketLayout();
  getFromLocalStorage();
  if (orderList.dishes.length > 0) {
    calcOrder();
  }
  getScreenCategory();
  if (window.innerWidth <= 600) {
    hideShoppingCart();
  }
  responsiveDesignAutomatic();
}

function renderMenu() {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = ""; // in case of a render function --> empty innerHTML before adding the content, otherwhise the content will be repeated over and over again

  contentRef.innerHTML = getMenuLayout();

  renderDish(dishes[0].starters, getStarterTemplate, "starters");
  renderDish(dishes[0].mainCourses, getMainCourseTemplate, "main_courses");
  renderDish(dishes[0].desserts, getDessertTemplate, "desserts");

  let buttonRef = document.getElementById("button_wrapper");
  buttonRef.innerHTML = "";
  buttonRef.innerHTML = getButtonUpTemplate();
}

function renderDish(dishArray, templateFunction, containerId) {
  let container = document.getElementById(containerId);
  container.innerHTML = "";

  for (let i = 0; i < dishArray.length; i++) {
    container.innerHTML += templateFunction(i);
  }
}

function renderBasketLayout() {
  let basketRef = document.getElementById("basket");
  basketRef.innerHTML = "";

  basketRef.innerHTML = getBasketLayout();

  // responsiveDish();
}

function renderBasketOrder() {
  let orderSubtotalRef = document.getElementById("subtotal");
  let orderDeliveryRef = document.getElementById("delivery");
  let orderTotalRef = document.getElementById("total");

  renderBasketItems();

  orderSubtotalRef.innerHTML = `${subtotal.toFixed(2)}`;
  orderDeliveryRef.innerHTML = `${delivery.toFixed(2)}`;
  orderTotalRef.innerHTML = `${total.toFixed(2)}`;
}

function renderBasketItems() {
  let orderItemRef = document.getElementById("order_item");
  orderItemRef.innerHTML = ""; // clear the order item section before adding new items

  for (let indexOrder = 0; indexOrder < orderList.dishes.length; indexOrder++) {
    orderItemRef.innerHTML += getOrderItemTemplate(indexOrder);

    let operatorPlus = document.getElementById(`plus${indexOrder}`);
    if (orderList.amounts[indexOrder] < 1) {
      removeFromBasket(indexOrder);
      continue; // skip to the next iteration if the amount is less than 1
    }
    if (orderList.amounts[indexOrder] === 20) {
      operatorPlus.classList.add("hide");
    }
  }
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

  if (shoppingCart.classList.contains("display_hide")) {
    removeNoScrollContent();
  } else {
    addNoScrollContent();
  }
}

function addNoScrollContent() {
  let contentFreeze = document.getElementById("content");
  contentFreeze.classList.add("no-scroll");
}

function removeNoScrollContent() {
  let contentFreeze = document.getElementById("content");
  contentFreeze.classList.remove("no-scroll");
}

function toggleContentWidth() {
  let content = document.getElementById("content");
  let dishWidth = document.querySelectorAll(".dish");

  content.classList.toggle("full_width");

  dishWidth.forEach((dish) => {
    dish.classList.toggle("dish_margin_right");
  });
}

let currentScreenSize = getScreenCategory();

function getScreenCategory() {
  // if (window.innerWidth <= 480) return "verySmall";
  if (window.innerWidth <= 375) return "mobileScreen";
  if (window.innerWidth <= 600) return "small";
  return "large";
}
// console.log("shoppingCart", shoppingCart);
// console.log("content", content);
// console.log("dishSize", dishSize);

function responsiveDesignAutomatic() {
  let content = document.getElementById("content");
  const newScreenSize = getScreenCategory();

  if (newScreenSize !== currentScreenSize) {
    content.classList.remove("full_width");

    if (newScreenSize === "small" || newScreenSize === "mobileScreen") {
      hideShoppingCart();
    } else if (newScreenSize === "large") {
      showShoppingCart();
    }
    currentScreenSize = newScreenSize; // Update the current screen size
  }
}

function hideShoppingCart() {
  let shoppingCart = document.getElementById("basket_wrapper");
  let content = document.getElementById("content");
  shoppingCart.classList.add("display_hide");
  content.classList.add("full_width");
  dishSize.forEach((dish) => {
    dish.classList.add("dish_margin_right");
  });
}

function showShoppingCart() {
  let shoppingCart = document.getElementById("basket_wrapper");
  shoppingCart.classList.remove("display_hide");
  content.classList.remove("full_width");
  dishSize.forEach((dish) => {
    dish.classList.remove("dish_margin_right");
  });
}

function windowHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
let lastHeight = window.innerHeight;

window.addEventListener("resize", () => {
  renderBasketOrder();
  responsiveDesignAutomatic();
  // responsiveDish();
  if (window.innerHeight !== lastHeight) {
    lastHeight = window.innerHeight;
    windowHeight();
  }
});

// Keep this function for learning purposes
// function getScreenCategory() {
//   if (window.innerWidth <= 480) return "verySmall";
//   if (window.innerWidth <= 600) return "small";
//   if (window.innerWidth <= 375) return "mobileScreen";
//   return "large";
// }

// function responsiveDesignAutomatic() {
//   const newScreenSize = getScreenCategory();

//   if (newScreenSize !== currentScreenSize) {
//     let shoppingCart = document.getElementById("basket_wrapper");
//     let content = document.getElementById("content");
//     let dishSize = document.querySelectorAll(".dish");

//     content.classList.remove("full_width");

//     if (newScreenSize === "verySmall") {
//       shoppingCart.classList.add("display_hide");
//       content.classList.add("full_width");
//       dishSize.forEach((dish) => {
//         dish.classList.add("dish_margin_right");
//       });
//     } else if (newScreenSize === "small") {
//       shoppingCart.classList.add("display_hide");
//       content.classList.add("full_width");
//       dishSize.forEach((dish) => {
//         dish.classList.add("dish_margin_right");
//       });
//     } else {
//       shoppingCart.classList.remove("display_hide");
//       content.classList.remove("full_width");
//       dishSize.forEach((dish) => {
//         dish.classList.remove("dish_margin_right");
//       });
//     }
//   }
// }

// function responsiveDish() {
//   const newScreenSize = getScreenCategory();
//   let shoppingCartShown = document.getElementById("basket_wrapper");
//   let dishText = document.querySelectorAll(".dish_text");
//   let dishSize = document.querySelectorAll(".dish");

//   dishText.forEach((dish) => {
//     if (
//       newScreenSize === "mobileScreen" &&
//       !shoppingCartShown.classList.contains("display_hide")
//     ) {
//       dish.classList.add("display_hide");
//     } else {
//       dish.classList.remove("display_hide");
//     }
//   });

//   dishSize.forEach((dish) => {
//     if (
//       newScreenSize === "mobileScreen" &&
//       !shoppingCartShown.classList.contains("display_hide")
//     ) {
//       dish.classList.add("smaller_dish");
//     } else {
//       dish.classList.remove("smaller_dish");
//     }
//   });
// }
