//  ===================== For cart.html =====================

const table = document.querySelector("tbody");
const deleteAll = document.querySelector("#delete-all");

// Load the Cart items and update total when DOM is loaded
window.addEventListener("DOMContentLoaded", getCartItems);

// for remove btn
table.addEventListener("click", e => {
  e.preventDefault();
  if (e.target.classList.contains("remove")) {
    deleteCartItems(e);
  }
});

// for quantity change
table.addEventListener("change", e => {
  e.preventDefault();
  if (e.target.classList.contains("quantity")) {
    updateQuantity(e);
  }
});

deleteAll.addEventListener("click", e => {
  table.innerHTML = "";
  Cart.deleteAllSessionStorage();
  updateSubTotal();
});

// Stop reloading when Enter was pressed
document.forms[0].addEventListener("submit", e => e.preventDefault());

// Checkout
document.querySelector(".checkout").addEventListener("click", checkOut);

function getCartItems() {
  Cart.cart.forEach(product => {
    const tr = document.createElement("tr");
    tr.id = product.id;
    tr.innerHTML = `
        
        <td class="product-thumbnail">
          <img src="${product.img}" alt="Image" class="img-fluid" />
        </td>
        <td class="product-name">
          <h2 class="h5 cart-product-title text-black">
            ${product.name}
          </h2>
        </td>
        <td>${product.price.toLocaleString()}</td>
        <td>
          <div class="input-group mb-3" style="max-width: 150px;">
          <input
          type="number"
          min="1"
          max="100"
          class="form-control text-center border mr-0 quantity"
          value="${product.quantity}"
          placeholder=""
          aria-label="Example text with button addon"
          aria-describedby="button-addon1"
          
        />
          </div>
        </td>
        <td class="productTotal">₱${(
          product.price.substring(1) * product.quantity
        ).toFixed(2)}</td>
        <td>
          <a href="#" class="btn btn-primary height-auto btn-sm remove">X</a>
        </td>
        `;

    table.appendChild(tr);
  });
  updateSubTotal();
}

function deleteCartItems(e) {
  const id = e.target.parentElement.parentElement.id;
  const productName = e.target.parentElement.parentElement
    .querySelector("h2")
    .textContent.trim();

  Cart.deleteItemSessionStorage(id);
  // Remove from the UI
  e.target.parentElement.parentElement.remove();
  Cart.toast(productName, "is deleted from the Cart");
  updateSubTotal();
}

function updateQuantity(e) {
  // Value Checking (quantity must be 1 to 100 only)
  if (e.target.value < 1) e.target.value = 1;
  else if (e.target.value > 100) e.target.value = 100;
  else if (isNaN(e.target.value)) e.target.value = 1;

  const id = e.target.parentElement.parentElement.parentElement.id;
  const quantity = e.target.value;

  // Update Session Storage
  Cart.updateQuantitySessionStorage(id, quantity);

  // Update UI
  updateProductTotal(e, quantity);
  updateSubTotal();
}

function updateProductTotal(e, quantity) {
  let price = e.target.parentElement.parentElement.previousElementSibling.textContent;
  price = parseFloat(price.substring(1));
  const total = (price * quantity).toFixed(2);

  e.target.parentElement.parentElement.nextElementSibling.textContent = `₱${total}`;
}

function updateSubTotal() {
  const productTotals = document.querySelectorAll(".productTotal");
  const subTotalArr = [];
  const subTotalElement = document.querySelector(".subtotal");

  productTotals.forEach(product => {
    subTotalArr.push(parseInt(product.textContent.substring(1), 10));
  });

  const subTotal = subTotalArr.reduce((a, b) => a + b, 0);
  subTotalElement.textContent = `₱${subTotal.toFixed(2)}`;

  updateDiscount(subTotal);
}

function updateDiscount(subTotal) {
  const totalQuantity = Cart.getTotalQuantitySessionStorage();
  const discountValue = document.querySelector(".discountValue");
  const discountPercent = document.querySelector("#discount");
  const discountParent = document.querySelector(".discountParent");
  let discount;
  let percentOff;

  // 5 percent
  if (totalQuantity >= 5 && totalQuantity <= 10) {
    discount = (subTotal * 0.05).toFixed(2);
    percentOff = 5;
    discountParent.style.display = "flex";
  }
  // 10 percent
  else if (totalQuantity >= 11 && totalQuantity <= 20) {
    discount = (subTotal * 0.1).toFixed(2);
    percentOff = 10;
    discountParent.style.display = "flex";
  }
  // 20 percent
  else if (totalQuantity > 20) {
    discount = (subTotal * 0.2).toFixed(2);
    percentOff = 20;
    discountParent.style.display = "flex";
  }
  // totalQuantity is less than 5
  else {
    discount = 0;
    percentOff = 0;
    discountParent.style.display = "none";
  }
  discountPercent.textContent = percentOff;
  discountValue.textContent = `₱${discount}`;
  updateTaxes(discount, subTotal);
}

function updateTaxes(discount, subTotal) {
  const taxesElement = document.querySelector(".taxes");
  let total = subTotal - discount;
  const taxes = total * 0.12;
  taxesElement.textContent = `₱${taxes.toFixed(2)}`;

  updateGrandTotal(total, taxes);
}

function updateGrandTotal(total, taxes) {
  const grandTotalElement = document.querySelector(".grandTotal");
  const grandTotal = (total + taxes).toFixed(2);

  grandTotalElement.textContent = `₱${grandTotal}`;
}

function checkOut(e) {
  e.preventDefault();
  const grandTotal = document.querySelector(".grandTotal").textContent;
  sessionStorage.setItem("grandTotal", grandTotal);
  window.location = "checkout.html";
}
