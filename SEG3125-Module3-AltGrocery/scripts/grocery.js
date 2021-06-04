var lactose = true;
var nut = true;
var organic = true;
var products = [
  {
    name: "Apple",
    price: 0.99,
    dairy: false,
    nuts: false,
    organic: false,
    image: "images/apple.png",
  },
  {
    name: "Pear (Organic)",
    price: 1.79,
    dairy: false,
    nuts: false,
    organic: true,
    image: "images/organicpear.png",
  },
  {
    name: "Peanut Butter (Organic)",
    price: 5.75,
    dairy: false,
    nuts: true,
    organic: true,
    image: "images/pb.png",
  },
  {
    name: "Milk",
    price: 4.0,
    dairy: true,
    nuts: false,
    organic: false,
    image: "images/milk.png",
  },
  {
    name: "Almond Milk",
    price: 3.5,
    dairy: true,
    nuts: true,
    organic: false,
    image: "images/almondmilk.png",
  },
  {
    name: "Cream Cheese",
    price: 2.99,
    dairy: true,
    nuts: false,
    organic: false,
    image: "images/creamcheese.png",
  },
  {
    name: "Almonds",
    price: 8.15,
    dairy: false,
    nuts: true,
    organic: false,
    image: "images/almonds.png",
  },
  {
    name: "Steak (Organic)",
    price: 11.25,
    dairy: false,
    nuts: false,
    organic: true,
    image: "images/steak.png",
  },
  {
    name: "Broccoli (Organic)",
    price: 3.1,
    dairy: false,
    nuts: false,
    organic: true,
    image: "images/broccoli.png",
  },
  {
    name: "String Beans",
    price: 2.79,
    dairy: false,
    nuts: false,
    organic: false,
    image: "images/stringbeans.png",
  },
  {
    name: "Mint Chocolate Chip Ice Cream",
    price: 1.5,
    dairy: true,
    nuts: false,
    organic: false,
    image: "images/icecream.png",
  },
  {
    name: "Pretzels",
    price: 2.25,
    dairy: false,
    nuts: false,
    organic: false,
    image: "images/pretzels.png",
  },
  {
    name: "Fruit Loops",
    price: 4.99,
    dairy: false,
    nuts: false,
    organic: false,
    image: "images/fruitloops.png",
  },
  {
    name: "Cheddar Block Cheese",
    price: 3.99,
    dairy: true,
    nuts: false,
    organic: false,
    image: "images/cheddarcheese.png",
  },
  {
    name: "Multigrain Bread",
    price: 1.8,
    dairy: false,
    nuts: false,
    organic: false,
    image: "images/bread.png",
  },
  {
    name: "Butter",
    price: 4.0,
    dairy: true,
    nuts: false,
    organic: false,
    image: "images/butter.png",
  },
  {
    name: "Eggs (Organic)",
    price: 5.0,
    dairy: false,
    nuts: false,
    organic: true,
    image: "images/eggs.jpg",
  },
  {
    name: "Bananas (Organic)",
    price: 1.15,
    dairy: false,
    nuts: false,
    organic: true,
    image: "images/bananas.png",
  },
  {
    name: "Strawberries (Organic)",
    price: 1.15,
    dairy: false,
    nuts: false,
    organic: true,
    image: "images/strawberries-package.jpg",
  },
  {
    name: "Pecan Pie",
    price: 12.0,
    dairy: false,
    nuts: true,
    organic: false,
    image: "images/pie.png",
  },
  {
    name: "Baby Carrots",
    price: 2.0,
    dairy: false,
    nuts: false,
    organic: false,
    image: "images/carrots.png",
  },
  {
    name: "Hummus",
    price: 3.05,
    dairy: false,
    nuts: false,
    organic: false,
    image: "images/hummus.png",
  },
  {
    name: "Rotisserie Chicken",
    price: 10.5,
    dairy: false,
    nuts: false,
    organic: false,
    image: "images/rotisseriechicken.png",
  },
  {
    name: "Crackers",
    price: 2.25,
    dairy: false,
    nuts: false,
    organic: false,
    image: "images/crackers.png",
  },
  {
    name: "Marshmallows",
    price: 3.05,
    dairy: false,
    nuts: false,
    organic: false,
    image: "images/marshmallows.png",
  },
  {
    name: "Lemonade",
    price: 3.55,
    dairy: false,
    nuts: false,
    organic: false,
    image: "images/lemonade.jpg",
  },
  {
    name: "Rice (Organic)",
    price: 3.99,
    dairy: false,
    nuts: false,
    organic: true,
    image: "images/rice.png",
  },
  {
    name: "Spaghetti",
    price: 2.49,
    dairy: false,
    nuts: false,
    organic: false,
    image: "images/spaghetti.png",
  },
];

var cart = [
];

function filterProducts() {
  let productsHere = [...products];
  if (organic) {
    productsHere = productsHere.filter((value) => value.organic);
  } else {
    productsHere = productsHere.filter((value) => !value.organic);
  }

  if (! lactose) {
    productsHere = productsHere.filter((value) => ! value.dairy);
  }

  if (! nut) {
    productsHere = productsHere.filter((value) => ! value.nuts);
  }

  productsHere.sort((a, b) => {
    return a.price > b.price;
  })

  return productsHere;
}

function calculateTotal() {
  let total = 0.00;

  for (let index = 0; index < cart.length; index++) {
    const element = cart[index];
    total += element.price;
  }

  return total;
}