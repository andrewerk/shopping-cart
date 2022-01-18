 // const { fetchProducts } = require("./helpers/fetchProducts");

// const getSavedCartItems = require("./helpers/getSavedCartItems");

// const saveCartItems = require("./helpers/saveCartItems");

// const { fetchItem } = require("./helpers/fetchItem");

const cart = document.querySelector('.cart__items');
const total = document.querySelector('.total-price');
const removeButton = document.querySelector('.empty-cart');
const titleConteiner = document.querySelector('.container-title');
let sum = 0;

function loadingStart() {
  const loading = document.createElement('div');
  loading.innerText = 'Carregando';
  loading.className = 'loading';
  titleConteiner.appendChild(loading);
}

function loadingEnd() {
  document.querySelector('.loading').remove();  
}

function retrieveCart() {
  cart.innerHTML = getSavedCartItems();
}

function retrieveSum() {
  total.innerText = localStorage.getItem('sum');
  sum = Number(localStorage.getItem('sum'));
}

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

async function cartItemClickListener(event) {
  if (event.target.className === 'cart__item') {
  const id = event.target.innerText.substring(5, 18);
  event.target.remove();
  saveCartItems(cart.innerHTML);
  const valueToRemove = await fetchItem(id);
  const { price } = valueToRemove;
  sum -= price;
  total.innerText = sum.toString();
  localStorage.setItem('sum', total.innerText);
}
}

cart.addEventListener('click', cartItemClickListener);

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  // li.addEventListener('click', cartItemClickListener); Retirei a linha pela lógica do código
  return li;
}

async function init() {
  loadingStart();
  const productSearch = await fetchProducts('computador');
  loadingEnd();
 productSearch.forEach((product) => {
   const { id: sku, title: name, thumbnail: image } = product;
   document.querySelector('.items').appendChild(createProductItemElement({ sku, name, image }));
 });
}

async function inserInCart(event) {
  const id = event.target.previousSibling.previousSibling.previousSibling.innerText;
  loadingStart();
  const item = await fetchItem(id);
  loadingEnd();
  const { id: sku, title: name, price: salePrice } = item;
  cart.appendChild(createCartItemElement({ sku, name, salePrice }));  
  saveCartItems(cart.innerHTML);
  sum += salePrice;
  total.innerText = sum.toString();
  localStorage.setItem('sum', total.innerText);
}

function clearCart() {
  cart.innerHTML = '';
  saveCartItems(cart.innerHTML);
  sum = 0;
  total.innerText = sum.toString();
  localStorage.setItem('sum', total.innerText);
}

removeButton.addEventListener('click', clearCart);
const items = document.querySelector('.items');
items.addEventListener('click', inserInCart);

window.onload = () => {
  init();
  retrieveCart();
  retrieveSum();
 };