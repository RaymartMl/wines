//  ===================== For shop-single.html =====================

document.querySelector(".buy-now").addEventListener("click", addToCartSingle);
document.querySelector(".quantity").addEventListener("change", quantityCheck);

function addToCartSingle(e) {
  e.preventDefault();

  const id = document.querySelector(".name").getAttribute("id");
  const img = document.querySelector(".image").getAttribute("src");
  const name = document.querySelector(".name").textContent;
  const price = document.querySelector(".price").textContent;
  const quantity = document.querySelector(".quantity").value;

  //   Add to Cart Array
  Cart.addProductSinglePage({
    id,
    img,
    name,
    price,
    quantity
  });
}

// Make sure Quantity is a number between 1 to 100
function quantityCheck(e) {
  // Value Checking (quantity must be 1 to 100 only)
  if (e.target.value < 1) e.target.value = 1;
  else if (e.target.value > 100) e.target.value = 100;
  else if (isNaN(e.target.value)) e.target.value = 1;
}
