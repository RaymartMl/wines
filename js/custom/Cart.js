//  ===================== Universal Cart Class =====================

class Cart {
  // Products that added to cart
  static cart = this.getProductsLocalStorage();

  static addProduct({ id, img, name, price, quantity = 1 }) {
    if (this.checkProduct(id)) {
      this.toast(name, "is Added to Cart", "#930077");
      this.cart.push({ id, img, name, price, quantity });
      this.saveCurrentCart();
    } else {
      // Make toast here
      this.toast(name, "is  already in the cart");
    }
  }

  static addProductSinglePage({ id, img, name, price, quantity }) {
    if (this.checkProduct(id)) {
      this.toast(name, "is Added to Cart", "#930077");
      this.cart.push({ id, img, name, price, quantity });
      this.saveCurrentCart();
    } else {
      // Make toast here
      this.addQuantityLocalStorage(id, quantity);
      this.toast(name, `add ${quantity} quantity`, "#930077");
    }
  }

  // check if product is already in cart by id
  static checkProduct(id) {
    const arr = this.cart.filter(product => product.id === id);
    return arr.length === 0;
  }

  //  ===================== Session storage Method =====================
  // Get products in session storage
  static getProductsLocalStorage() {
    let items;
    if (localStorage.getItem("cart") === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem("cart"));
    }

    return items;
  }

  // Save the cart to Session Storage
  static saveCurrentCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  static deleteItemLocalStorage(id) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach((product, index) => {
      if (id === product.id) {
        cart.splice(index, 1);
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static deleteAllLocalStorage() {
    if (localStorage.getItem("cart") === null) {
      this.toast("", "There's was no item in the Cart");
    } else {
      localStorage.removeItem("cart");
      this.toast("", "All items on Cart are deleted");
    }
  }

  static updateQuantityLocalStorage(id, quantity) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach((product, index) => {
      if (id === product.id) {
        product.quantity = quantity;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static addQuantityLocalStorage(id, quantity) {
    const cart = this.getProductsLocalStorage();
    cart.forEach((product, index) => {
      if (id === product.id) {
        product.quantity = parseInt(product.quantity, 10) + parseInt(quantity, 10);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    });
  }

  static getTotalQuantityLocalStorage() {
    return this.getProductsLocalStorage()
      .map(product => parseInt(product.quantity, 10))
      .reduce((a, b) => a + b, 0);
  }

  //  ===================== Toasts Method =====================

  // Toast
  static toast(product, msg, background = "rgb(250, 54, 54)") {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="toast  text-light my-1" style=" background: ${background};">
    ${product} ${msg}
  </div>
    
    `;
    document.querySelector(".toasts").appendChild(div);
    this.deleteToast();
  }

  static deleteToast() {
    setTimeout(() => {
      document.querySelector(".toast").remove();
    }, 2500);
  }
}
