// const { fetchProducts } = require("./helpers/fetchProducts");

// const { fetchItem } = require("./helpers/fetchItem");

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function init() {
  const productSearch = await fetchProducts('computador');
 productSearch.forEach((product) => {
   const { id: sku, title: name, thumbnail: image } = product;
   document.querySelector('.items').appendChild(createProductItemElement({ sku, name, image }));
 });
}

async function inserInCart(event) {
  const id = event.target.previousSibling.previousSibling.previousSibling.innerText;
  const item = await fetchItem(id);
  const { id: sku, title: name, price: salePrice } = item;
  const cart = document.querySelector('.cart__items');
  cart.appendChild(createCartItemElement({ sku, name, salePrice }));  
}

const items = document.querySelector('.items');
items.addEventListener('click', inserInCart);

window.onload = () => {
  init();
 };
