//  ===================== For cart.html =====================

const table = document.querySelector("tbody");
const deleteAll = document.querySelector("#delete-all");

// Load the Cart items when DOM is loaded
window.addEventListener("DOMContentLoaded", getCartItems);

table.addEventListener("click", e => {
  e.preventDefault();
  if (e.target.classList.contains("remove")) {
    deleteCartItems(e);
  }
});

table.addEventListener("change", e => {
  e.preventDefault();
  if (e.target.classList.contains("quantity")) {
    updateQuantity(e);
  }
});

deleteAll.addEventListener("click", e => {
  table.innerHTML = "";
  Cart.deleteAllSessionStorage();
});

// Stop reloading when Enter was pressed
document.forms[0].addEventListener("submit", e => e.preventDefault());

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
        <td>${product.price}</td>
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
        <td>$${(product.price.substring(1) * product.quantity).toFixed(2)}</td>
        <td>
          <a href="#" class="btn btn-primary height-auto btn-sm remove">X</a>
        </td>
        `;

    table.appendChild(tr);
  });
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
}

function updateQuantity(e) {
  // Value Checking
  if (e.target.value < 1) e.target.value = 1;
  else if (e.target.value > 100) e.target.value = 100;
  else if (isNaN(e.target.value)) e.target.value = 1;

  const id = e.target.parentElement.parentElement.parentElement.id;
  const quantity = e.target.value;

  updateProductTotal(e, quantity);

  Cart.updateQuantitySessionStorage(id, quantity);
}

function updateProductTotal(e, quantity) {
  let price = e.target.parentElement.parentElement.previousElementSibling.textContent;
  price = parseFloat(price.substring(1));
  const total = (price * quantity).toFixed(2);

  e.target.parentElement.parentElement.nextElementSibling.textContent = `$${total}`;
}
