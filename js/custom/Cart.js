//  ===================== Universal Cart Class =====================

class Cart {
  // Products that added to cart
  static cart = this.getProductsSessionStorage();

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

  // check if product is already in cart by id
  static checkProduct(id) {
    const arr = this.cart.filter(product => product.id === id);
    return arr.length === 0;
  }

  //  ===================== Session storage Method =====================
  // Get products in session storage
  static getProductsSessionStorage() {
    let items;
    if (sessionStorage.getItem("cart") === null) {
      items = [];
    } else {
      items = JSON.parse(sessionStorage.getItem("cart"));
    }

    return items;
  }

  // Save the cart to Session Storage
  static saveCurrentCart() {
    sessionStorage.setItem("cart", JSON.stringify(this.cart));
  }

  static deleteItemSessionStorage(id) {
    const cart = JSON.parse(sessionStorage.getItem("cart"));
    cart.forEach((product, index) => {
      if (id === product.id) {
        cart.splice(index, 1);
      }
    });

    sessionStorage.setItem("cart", JSON.stringify(cart));
  }

  static deleteAllSessionStorage() {
    if (sessionStorage.getItem("cart") === null) {
      this.toast("", "There's was no item in the Cart");
    } else {
      sessionStorage.removeItem("cart");
      this.toast("", "All items on Cart are deleted");
    }
  }

  static updateQuantitySessionStorage(id, quantity) {
    const cart = JSON.parse(sessionStorage.getItem("cart"));
    cart.forEach((product, index) => {
      if (id === product.id) {
        product.quantity = quantity;
      }
    });

    sessionStorage.setItem("cart", JSON.stringify(cart));
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
