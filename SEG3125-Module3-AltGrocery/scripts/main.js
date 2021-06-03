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
}

/**
 * 
 * @param {String} attr 
 * @param {number} index 
 */
function selectCheckoutOptions(attr) {
  document.getElementById('pick-up').classList.remove('selected');
  document.getElementById('drop-off').classList.remove('selected');

  document.getElementById(attr).classList.add('selected');
}

/**
 *
 */
function profileDropdownChange() {
  const select = document.getElementById("selectOptions").value;
  if (select === "None") {
    lactose = true;
    nut = true;
  } else if (select === "Lactose free") {
    lactose = false;
    nut = true;
  } else if (select === "Nut free") {
    lactose = true;
    nut = false;
  } else {
    lactose = false;
    nut = false;
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

    const addButton = document.createElement("button");
    addButton.id = index;
    addButton.classList.add("btn");
    if (cart.indexOf(element) === -1) {
      addButton.classList.add("addBtn");
      addButton.innerText = "Add To Cart";
      addButton.onclick = () => {
        addToCart(element, index);
      };
    } else {
      addButton.classList.add("added");
      addButton.innerText = "Added to cart";
      addButton.onmouseenter = () => {
        addButton.innerText = "Remove From Cart";
      };
      addButton.onmouseleave = () => {
        addButton.innerText = "Added to cart";
      };
      addButton.onclick = () => {
        removeFromCart(element, index);
      };
    }

    leftDiv.appendChild(priceDiv);
    leftDiv.appendChild(addButton);

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
  btn.innerText = "Added to cart";
  btn.onmouseenter = () => {
    btn.innerText = "Remove From Cart";
  };
  btn.onmouseleave = () => {
    btn.innerText = "Added to cart";
  };
  btn.onclick = () => {
    removeFromCart(product, btnId);
  };

  document.getElementById("cartNumbers").innerText = `(${cart.length})`;
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
  btn.onclick = () => {
    addToCart(product, btnId);
  };
  btn.onmouseenter = () => {};
  btn.onmouseleave = () => {};

  cart = cart.filter((value, index) => {
    if (value.name !== product.name) {
      return true;
    }
  });

  document.getElementById("cartNumbers").innerText = `(${cart.length})`;``
}


function createReceiptBody() {
  const body = document.getElementById("receiptBody");

  while(body.firstChild) {
    body.removeChild(body.firstChild);
  }

  for(let index = 0; index < cart.length; index++) {
    const element = cart[index];

    const listItem = document.createElement("div");
    listItem.classList.add("receiptListItem");

    const divName = document.createElement("div");
    divName.innerText = element.name;

    const divPrice = document.createElement("div");
    divPrice.innerText = `$ ${element.price.toFixed(2)}`

    listItem.appendChild(divName);
    listItem.appendChild(divPrice);

    body.appendChild(listItem);
  }
}

function createReceiptFooter() {
  const footer = document.getElementById("receiptFooter");
  while(footer.firstChild) {
    footer.removeChild(footer.firstChild);
  }
  const totalP = document.createElement("div");
  totalP.innerText = "Total: ";

  const total = document.createElement("div");
  total.innerText = `$ ${calculateTotal().toFixed(2)}`;

  footer.appendChild(totalP);
  footer.appendChild(total);
}