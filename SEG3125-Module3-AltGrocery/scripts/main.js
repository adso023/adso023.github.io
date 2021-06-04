/**
 * Changes the navigation stuff
 * @param {String} nav
 * @param {String} view
 */
function navigateTopLevel(view) {
  const viewItems = document.querySelector("main");
  const viewChildren = viewItems.children;
  for (let index = 0; index < viewChildren.length; index++) {
    viewChildren.item(index).classList.replace("in-view", "out-view");
    if (viewChildren.item(index).id === view) {
      viewChildren.item(index).classList.remove("out-view");
      viewChildren.item(index).classList.add("in-view");
    }
  }
}

function showCheckoutModal() {
  document.getElementById("checkoutModal").style.display = "block";
}

function closeCheckout() {
  document.getElementById("checkoutModal").style.display = "none";
  document.getElementById("confirmScreen").remove();
  document.getElementById("checkoutOptions").style.display = "flex";
  document.getElementById("paymentInfo").style.display = "block";
}

function finalCheckout() {
  const checkoutBody = document.getElementById("checkoutBody");

  for (let i = 0; i < checkoutBody.children.length; i++) {
    checkoutBody.children.item(i).style.display = "none";
  }

  const confirmScreen = document.createElement("div");
  confirmScreen.id = "confirmScreen";
  confirmScreen.append("Order is confirmed");

  checkoutBody.appendChild(confirmScreen);
}

/**
 *
 * @param {String} attr
 * @param {number} index
 */
function selectCheckoutOptions(attr) {
  document.getElementById("pick-up").classList.remove("selected");
  document.getElementById("drop-off").classList.remove("selected");

  document.getElementById(attr).classList.add("selected");
}

/**
 *
 * @param {String} value
 */
function categorySwitcher(value) {
  if (value === "none" && document.getElementById(value).checked) {
    lactose = true;
    nut = true;
    document.getElementById("lactose").checked = false;
    document.getElementById("nut").checked = false;
  } else if (value === "none" && !document.getElementById(value).checked) {
    lactose = false;
    nut = false;
    document.getElementById("lactose").checked = true;
    document.getElementById("nut").checked = true;
  } else if (value === "lactose" && document.getElementById(value).checked) {
    lactose = false;
    document.getElementById("none").checked = false;
  } else if (value === "lactose" && !document.getElementById(value).checked) {
    lactose = true;
  } else if (value === "nut" && document.getElementById(value).checked) {
    nut = false;
    document.getElementById("none").checked = false;
  } else if (value === "nut" && !document.getElementById(value).checked) {
    nut = true;
  }

  // Cleanup
  if (lactose && nut) {
    document.getElementById("none").checked = true;
  }
}

/**
 * Switch Organic and Non-Organic
 * @param {Boolean} value
 */
function organicSwitcher(value) {
  organic = value;
}

function populateProductFields() {
  const productDiv = document.getElementById("productBody");
  const productsHere = filterProducts();
  while (productDiv.firstChild) {
    productDiv.removeChild(productDiv.firstChild);
  }

  for (let index = 0; index < productsHere.length; index++) {
    const element = productsHere[index];

    const listItemDiv = document.createElement("div");
    listItemDiv.classList.add("listitem");

    const imgTitleDiv = document.createElement("div");
    imgTitleDiv.classList.add("itemTitle");

    const img = document.createElement("img");
    img.src = element.image;
    img.alt = element.name;
    img.width = 48;
    img.height = 48;

    const titleDiv = document.createElement("div");
    titleDiv.innerText = element.name;
    titleDiv.style.marginLeft = "10px";

    imgTitleDiv.appendChild(img);
    imgTitleDiv.appendChild(titleDiv);

    const leftDiv = document.createElement("div");
    leftDiv.classList.add("leftDiv");

    const priceDiv = document.createElement("div");
    priceDiv.innerText = `$ ${element.price.toFixed(2)}`;

    const checkBox = document.createElement("input");
    checkBox.id = index;
    checkBox.type = "checkbox";
    if (cart.indexOf(element) === -1) {
      checkBox.classList.add("addBtn");
    } else {
      checkBox.checked = true;
      checkBox.classList.add("added");
    }
    checkBox.onchange = () => {
      checkBox.checked
        ? addToCart(element, index)
        : removeFromCart(element, index);
    };

    leftDiv.appendChild(priceDiv);
    leftDiv.appendChild(checkBox);

    listItemDiv.appendChild(imgTitleDiv);
    listItemDiv.appendChild(leftDiv);

    productDiv.appendChild(listItemDiv);
  }
}

/**
 *
 * @param {object} product
 * @param {string} btnId
 */
function addToCart(product, btnId) {
  cart = [...cart, product];
  const btn = document.getElementById(btnId);
  btn.classList.add("added");
  btn.onchange = () => {
    !btn.checked ? removeFromCart(product, btnId) : addToCart(product, btnId);
  };
}

/**
 * @param {object} product
 * @param {String} btnId
 */
function removeFromCart(product, btnId) {
  const btn = document.getElementById(btnId);

  btn.classList.remove("added");
  btn.classList.add("addBtn");
  btn.innerText = "Add To Cart";
  btn.onchange = () => {
    btn.checked ? removeFromCart(product, btnId) : addToCart(product, btnId);
  };

  cart = cart.filter((value, index) => {
    if (value.name !== product.name) {
      return true;
    }
  });
}

function createReceiptBody() {
  const body = document.getElementById("receiptBody");

  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }

  for (let index = 0; index < cart.length; index++) {
    const element = cart[index];

    const listItem = document.createElement("div");
    listItem.classList.add("receiptListItem");

    const divName = document.createElement("div");
    divName.innerText = element.name;

    const divPrice = document.createElement("div");
    divPrice.innerText = `$ ${element.price.toFixed(2)}`;

    listItem.appendChild(divName);
    listItem.appendChild(divPrice);

    body.appendChild(listItem);
  }
}

function createReceiptFooter() {
  const footer = document.getElementById("receiptFooter");
  while (footer.firstChild) {
    footer.removeChild(footer.firstChild);
  }
  const totalP = document.createElement("div");
  totalP.innerText = "Total: ";

  const total = document.createElement("div");
  total.innerText = `$ ${calculateTotal().toFixed(2)}`;

  footer.appendChild(totalP);
  footer.appendChild(total);
}
