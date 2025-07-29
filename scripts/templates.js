function getMenuLayout() {
  return `
          <div class="headline_img_container" id="headline_img">
              <img class="headline_img img_width" src="./assets/img/tapas.jpg"/>
              <div class="logo_div"><img class="headline_logo" src="./assets/icons/prawn.png"></div>
          </div>
          <div class="headline margin_top_48">
            <h1>Tapas Paradise</h1>
            <h3>Review (3/5 stars)</h3>
          </div>

          <div class="menu_bar img_width">
          ${getMenuItemTemplate("Starters", "starters_img")}
          ${getMenuItemTemplate("Main Courses", "main_courses_img")}
          ${getMenuItemTemplate("Desserts", "desserts_img")}
          </div>

          ${getMenuListTemplate("Starters", "starters_img", "starters")}
          ${getMenuListTemplate("Main Courses", "main_courses_img", "main_courses")}
          ${getMenuListTemplate("Desserts", "desserts_img", "desserts")}
    `;
}

function getMenuItemTemplate(category, imgLink) {
  return `
        <span class="menu_item">
          <img class="arrow" src="./assets/icons/right-arrow.png" />
          <a class="menu_text" href="#${imgLink}">${category}</a>
        </span>`;
}

function getMenuListTemplate(category, imgLink, divId) {
  return `
      <img class="menu_img img_width" id="${imgLink}" src="./assets/img/${divId}.jpg" />
        <div class="headline">
            <h2>${category}</h2>
        </div>
        <div id="${divId}"></div>`;
}

function getButtonUpTemplate() {
  return `<div class="button_up" onclick="scrollToTop()">
            <img src="./assets/icons/arrow_up_transparency.png" class="arrow_up default" />
            <img src="./assets/icons/arrow_up.png" class="arrow_up hover" />
          </div>`;
}

function getStarterTemplate(indexDishes) {
  return `<div class="dish" id="dish">
              <span class="dish_header">
                <h3 class="dish_title">${
                  dishes[0].starters[indexDishes].name
                }</h3>
                <div class="add_button" onclick="addToBasket(${indexDishes}, 'starters')">+</div>
              </span>
              <a class="dish_text" id="dish_text">${
                dishes[0].starters[indexDishes].description
              }</a>
              <a class="price">${dishes[0].starters[indexDishes].price.toFixed(
                2
              )} €</a>
            </div>`;
}

function getMainCourseTemplate(indexDishes) {
  return `<div class="dish" id="dish">
              <span class="dish_header">
                <h3 class="dish_title">${
                  dishes[0].mainCourses[indexDishes].name
                }</h3>
                <div class="add_button" onclick="addToBasket(${indexDishes}, 'mainCourses')">+</div>
              </span>
              <a class="dish_text" id="dish_text">${
                dishes[0].mainCourses[indexDishes].description
              }</a>
              <a class="price">${dishes[0].mainCourses[
                indexDishes
              ].price.toFixed(2)} €</a>
            </div>`;
}

function getDessertTemplate(indexDishes) {
  return `<div class="dish" id="dish">
              <span class="dish_header">
                <h3 class="dish_title">${
                  dishes[0].desserts[indexDishes].name
                }</h3>
                <div class="add_button" onclick="addToBasket(${indexDishes}, 'desserts')">+</div>
              </span>
              <a class="dish_text" id="dish_text">${
                dishes[0].desserts[indexDishes].description
              }</a>
              <a class="price">${dishes[0].desserts[indexDishes].price.toFixed(
                2
              )} €</a>
            </div>`;
}

function getBasketLayout() {
  return `<h2 class="cart_header">Shopping Cart</h2>
            <div class="divider"></div>
            <div class="order_list">
              <div class="order_item" id="order_item">
              <h3>Empty Shopping Cart</h3>
              </div>
              <div class="divider"></div>
              <div class="calculation">
                <table>
                  <tr>
                    <td class="padding_tb_4">Subtotal</td>
                    <td class="amount padding_tb_4" id="subtotal">0.00</td>
                    <td class="padding_tb_4 width_5">€</td>
                  </tr>
                  <tr>
                    <td class="padding_tb_4">Delivery Costs</td>
                    <td class="amount padding_tb_4" id="delivery">0.00</td>
                    <td class="padding_tb_4 width_5">€</td>
                  </tr>
                  <th class="padding_tb_4 total_sum">Total Sum</th>
                  <th class="amount padding_tb_4" id="total">0.00</th>
                  <th class="padding_tb_4 width_5">€</th>
                </table>
              </div>
              <div class="divider"></div>
              <div class="button_row">
                <div class="button" onclick="confirmOrder()">Confirm Order</div>
                <div class="button" onclick="deleteOrder()">Delete Shopping Cart</div>
              </div>

            </div>
          </div>

  `;
}

function getOrderItemTemplate(indexOrder) {
  return `
    <table>
        <th class="table_dish" colspan="6">
            ${orderList.dishes[indexOrder]}
        </th>
        <tr>
            <td class="operator" id="minus${indexOrder}" onclick="decreaseAmount(${indexOrder})">-</td>
            <td class="amount" data-original="1">${
              orderList.amounts[indexOrder]
            }</td>
            <td class="padding_r_16">x</td>
            <td class="operator" id="plus${indexOrder}" onclick="increaseAmount(${indexOrder})">+</td>
            <td class="amount">${orderList.calcPrice[indexOrder].toFixed(
              2
            )}</td>
            <td class="padding_r_16">€</td>
            <td class="trash_column">
                <img class="trash" onclick="removeFromBasket(${indexOrder})" src="./assets/icons/disposal.png" />
            </td>
        </tr>
    </table>
    `;
}

// Code kept as example for changing layout depending on screen size
// function getOrderItemTemplate(indexOrder) {
//   const isSmallScreen = window.innerWidth <= 600;

//   if (isSmallScreen) {
//     return `
//     <table>
//         <th class="table_dish" colspan="6">
//             ${orderList.dishes[indexOrder]}
//         </th>
//         <tr>
//             <td class="operator" id="minus${indexOrder}" onclick="decreaseAmount(${indexOrder})">-</td>
//             <td class="amount" data-original="1">${
//               orderList.amounts[indexOrder]
//             }</td>
//             <td class="padding_r_16">x</td>
//             <td class="operator" id="plus${indexOrder}" onclick="increaseAmount(${indexOrder})">+</td>
//         </tr>
//         <tr>
//             <td class="amount">${orderList.calcPrice[indexOrder].toFixed(
//               2
//             )}</td>
//             <td class="padding_r_16">€</td>
//             <td class="trash_column" colspan="2">
//                 <img class="trash" onclick="removeFromBasket(${indexOrder})" src="./assets/icons/disposal.png" />
//             </td>
//         </tr>
//     </table>
//     `;
//   } else {
//     return `
//     <table>
//         <th class="table_dish" colspan="6">
//             ${orderList.dishes[indexOrder]}
//         </th>
//         <tr>
//             <td class="operator" id="minus${indexOrder}" onclick="decreaseAmount(${indexOrder})">-</td>
//             <td class="amount" data-original="1">${
//               orderList.amounts[indexOrder]
//             }</td>
//             <td class="padding_r_16">x</td>
//             <td class="operator" id="plus${indexOrder}" onclick="increaseAmount(${indexOrder})">+</td>
//             <td class="amount">${orderList.calcPrice[indexOrder].toFixed(
//               2
//             )}</td>
//             <td class="padding_r_16">€</td>
//             <td class="trash_column">
//                 <img class="trash" onclick="removeFromBasket(${indexOrder})" src="./assets/icons/disposal.png" />
//             </td>
//         </tr>
//     </table>
//     `;
//   }
// }

