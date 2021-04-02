function Buns(flavor, glazing, amount, img, id) {
  this.flavor = flavor;
  this.glazing = glazing;
  this.amount = amount;
  this.img = img;
  this.id = id;
}

function addToCart(flavor, glazing, amount, img) {
  if (amount == '0') {
    return false;
  }
  var cart = JSON.parse(localStorage.getItem("cartList"));


  if (cart === null) {
    let bun = new Buns(flavor, glazing, amount, img, 0);
    cart = [bun];
  } else {
    let bun = new Buns(flavor, glazing, amount, img, cart.length);
    cart.push(bun);
  }
  let itemCounter = document.getElementById("itemCounter");
  itemCounter.innerHTML = cart.length;
  localStorage.setItem("cartList", JSON.stringify(cart));
}

function cartOnload() {
  var lis = JSON.parse(localStorage.getItem("cartList"));
  console.log("called")
  if (lis === null) {
    ul = document.getElementById("cart-list");
    ul.innerHTML = "You haven't added anything to your Cart yet!"
  } else {
    console.log("hereeeeeeee")

    for (var i = 0; i < lis.length; i++) {
      // create div
      let div = document.createElement("div");
      div.className = "cart-element";
      // div.id = i.toString();

      // creating image child
      let cart_img = document.createElement("img");
      cart_img.src = lis[i].img;
      let str = lis[i].img.split("/")
      cart_img.alt = str[str.length - 1]
      cart_img.className = "cart-img";
      div.appendChild(cart_img);

      // creating text child
      let flavor = document.createElement("p");
      flavor.className = "cart-flavor";
      let flavor_text = document.createTextNode(lis[i].flavor);
      flavor.appendChild(flavor_text);
      div.appendChild(flavor);

      //creating glazing
      let glazing = document.createElement("p");
      glazing.className = "cart-glazing";
      let glazing_text = document.createTextNode("Glazing: " + lis[i].glazing);
      glazing.appendChild(glazing_text);
      div.appendChild(glazing);
      
      // creating amount
      let amount = document.createElement("p");
      amount.className = "cart-amount";
      let amount_text = document.createTextNode("qty: " + lis[i].amount);
      amount.appendChild(amount_text);
      div.appendChild(amount);

      let del = document.createElement("button");
      del.className = "cart-delete";
      del.id = lis[i].id;
      del.onclick = function(){deletion(this)}; 
      let delete_text = document.createTextNode("x");
      del.appendChild(delete_text);
      div.appendChild(del);

      ul = document.getElementById("cart-list");
      ul.appendChild(div);
    }
  }
  let checkout = document.createElement("button");
  checkout.className = "cart-checkout";
  let checkout_text = document.createTextNode("Checkout!");
  checkout.appendChild(checkout_text);
  ul.appendChild(checkout);
}
function deletion (e) {
  
  // delete node
  e.parentNode.parentNode.removeChild(e.parentNode);

  // delete local storage
  var lis = JSON.parse(localStorage.getItem("cartList"));

  var idx = 0
  for (var i = 0; i < lis.length; i ++){

    if (lis[i].id == e.id) {

      idx = i;
    }
  }
  if (idx > -1) {
    lis.splice(idx, 1);
  }

  localStorage.setItem("cartList", JSON.stringify(lis));
}

function pageOnLoad() {
  var cart = JSON.parse(localStorage.getItem("cartList"));
  let itemCounter = document.getElementById("itemCounter");
  if (cart === null) {
    itemCounter.innerHTML = 0;
  } else {
    itemCounter.innerHTML = cart.length;
  }
}
