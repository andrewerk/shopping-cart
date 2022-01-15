const getSavedCartItems = () => {
  const storageCart = localStorage.getItem('cartItems');
  return storageCart;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
