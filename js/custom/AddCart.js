//  ===================== For shop.html =====================
// Get the Add to cart buttons
document.querySelectorAll(".add").forEach(btn => {
  btn.addEventListener("click", addToCart);
});

// Get the info of the Cart
function addToCart(e) {
  e.preventDefault();
  //  Get the parent Card
  const productCard = e.target.parentNode.parentNode;

  //   Get the info of the product
  const id = productCard.getAttribute("id");
  const img = productCard.querySelector("img").getAttribute("src");
  const name = productCard.querySelector(".heading").textContent;
  const price = productCard.querySelector(".price").textContent;

  //   Add to Cart Array
  Cart.addProduct({
    id,
    img,
    name,
    price
  });
}
