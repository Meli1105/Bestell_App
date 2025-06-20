function getMenuLayout() {
    return `
    <img class="headline_img" src="./assets/img/tapas.jpg" />
          <div class="headline">
            <h1>Tapas Paradise</h1>
            <h3>Review (3/5 stars)</h3>
          </div>

          <div class="menu_bar">
            <span class="menu_item">
              <img class="arrow" src="./assets/icons/right-arrow.png" />
              <a class="menu_text" href="#starters_img">Starters</a>
            </span>

            <span class="menu_item">
              <img class="arrow" src="./assets/icons/right-arrow.png" />
              <a class="menu_text" href="#main_courses_img">Main Course</a>
            </span>

            <span class="menu_item">
              <img class="arrow" src="./assets/icons/right-arrow.png" />
              <a class="menu_text" href="#desserts_img">Desserts</a>
            </span>
          </div>

          <img class="menu_img" id="starters_img" src="./assets/img/bruschetta.jpg" />
          <div class="headline">
            <h2>Starters</h2>
          </div>
          <div id="starters"></div>

          <img class="menu_img" id="main_courses_img" src="./assets/img/spaghetti-1392266_1920.jpg" />
          <div class="headline">
            <h2>Main Courses</h2>
          </div>
          <div id="main_courses"></div>

          <img class="menu_img" id="desserts_img" src="./assets/img/creme-brulee-3490882_1920.jpg" />
          <div class="headline">
            <h2>Desserts</h2>
          </div>
          <div id="desserts"></div>
    `;
}

function getStarterTemplate(indexDishes) {
    return `<div class="dish">
              <span class="dish_header">
                <h3 class="dish_title">${dishes[0].starters[indexDishes].name}</h3>
                <div class="add_button" onclick="addToBasket(${indexDishes}, 'starters')">+</div>
              </span>
              <a>${dishes[0].starters[indexDishes].description}</a>
              <a class="price">${dishes[0].starters[indexDishes].price.toFixed(2)} €</a>
            </div>`;
}

function getMainCourseTemplate(indexDishes) {
    return `<div class="dish">
              <span class="dish_header">
                <h3 class="dish_title">${dishes[0].mainCourses[indexDishes].name}</h3>
                <div class="add_button" onclick="addToBasket(${indexDishes}, 'mainCourses')">+</div>
              </span>
              <a>${dishes[0].mainCourses[indexDishes].description}</a>
              <a class="price">${dishes[0].mainCourses[indexDishes].price.toFixed(2)} €</a>
            </div>`;
}

function getDessertTemplate(indexDishes) {
    return `<div class="dish">
              <span class="dish_header">
                <h3 class="dish_title">${dishes[0].desserts[indexDishes].name}</h3>
                <div class="add_button" onclick="addToBasket(${indexDishes}, 'desserts')">+</div>
              </span>
              <a>${dishes[0].desserts[indexDishes].description}</a>
              <a class="price">${dishes[0].desserts[indexDishes].price.toFixed(2)} €</a>
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
            <td class="operator" onclick="decreaseAmount(${indexOrder})">-</td>
            <td class="amount" data-original="1">${orderList.amounts[indexOrder]}</td>
            <td class="padding_r_16">x</td>
            <td class="operator" onclick="increaseAmount(${indexOrder})">+</td>
            <td class="amount">${orderList.calcPrice[indexOrder].toFixed(2)}</td>
            <td class="padding_r_16">€</td>
            <td class="trash_column">
                <img class="trash" onclick="removeFromBasket(${indexOrder})" src="./assets/icons/disposal.png" />
            </td>
        </tr>
    </table>
    `
}