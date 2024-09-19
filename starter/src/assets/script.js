/**
 * @description Represents the products/items available in the shop for purchase.
 * Each item object contains a name, price, quantity, productId, and a image URL.
 */
const products = [
  {
      name: 'Carton of Cherries',
      price: 4.00,
      quantity: 0,
      productId: 1,
      image: './images/cherry.jpg'
  },
  {
      name: 'Carton of Strawberries',
      price: 5.00,
      quantity: 0,
      productId: 2,
      image: './images/strawberry.jpg'
  },
  {
      name: 'Bag of Oranges',
      price: 10.00,
      quantity: 0,
      productId: 3,
      image: './images/orange.jpg'
  }
];

let cart = [];
let totalPaid = 0; // Keeps track of the total amount paid by the cust.

const findProductById = (productId, productList) => productList.find(product => product.productId === productId);

/**
* @description Adds a product to the cart or increases its quantity if it's already in the cart.
* @param {number} productId - The unique ID # of the product.
*/
function addProductToCart(productId) {
  const product = findProductById(productId, products);
  if (!product) {
      alert(`Item with ID ${productId} not found.`);
      return;
  }

  const cartProduct = findProductById(productId, cart);
  if (cartProduct) {
      cartProduct.quantity++;
  } else {
      cart.push({ ...product, quantity: 1 });
  }
  renderCart();
}

/**
* @description Removes a product from the cart completely.
* @param {number} productId - The unique ID # of the product.
*/
function removeProductFromCart(productId) {
  const cartItemIndex = cart.findIndex(item => item.productId === productId);
  if (cartItemIndex > -1) {
      cart.splice(cartItemIndex, 1);
      renderCart();
  } else {
      alert(`Item selected with ID ${productId} not found in the cart.`);
  }
}

/**
* @description Calculates and returns the total cost of all products in the cart.
* @returns {number} - The total cost of all products in the cart.
*/
function cartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
* @description Handles payment,  and calculates remaining balance or change based on the total cost and the amount paid.
* @param {number} amount - The amount of money the customer has paid.
* @returns {number} - The difference between the amount paid and the total cost.
*/
function pay(amount) {
  const totalCost = cartTotal();
  if (amount < totalCost) {
      alert('Insufficient funds for this transaction.');
      return;
  }
  totalPaid += amount - totalCost;
  return totalPaid;
}

/**
* @description Updates the visual representation of the shopping cart in the UI.
*/
function renderCart() {
  const cartContainer = document.querySelector('.cart');
  cartContainer.innerHTML = cart.length === 0
      ? "<p>Your cart is  currently empty</p>"
      : cart.map(item => `
          <div class="cart-item" data-productId="${item.productId}">
              <h3>${item.name}</h3>
              <p>Price: $${item.price}</p>
              <p>Quantity: ${item.quantity}</p>
              <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
              <button onclick="increaseQuantity(${item.productId})">+</button>
              <button onclick="decreaseQuantity(${item.productId})">-</button>
              <button onclick="removeProductFromCart(${item.productId})">Remove</button>
          </div>
      `).join('');
}

// Set up the store (display products).
const initializeStore = () => {
  const productsContainer = document.querySelector('.products');
  products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product-item');
      productElement.innerHTML = `
          <h3>${product.name}</h3>
          <img src="${product.image}" alt="${product.name}">
          <p>Price: $${product.price}</p>
          <button onclick="addProductToCart(${product.productId})">Add to Cart</button>
      `;
      productsContainer.appendChild(productElement);
  });
};

// Calls initializeStore to set up the UI.
initializeStore();
