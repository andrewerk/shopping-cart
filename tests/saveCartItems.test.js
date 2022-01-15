const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('Verifica se ao chamar saveCartItems, localStorage.setItem é chamado', () =>{
    saveCartItems();
    expect(localStorage.setItem).toHaveBeenCalled();
  })
  it('Verifica se ao chamar saveCartItems com argumento <ol><li>Item</li></ol>, localStorage.setItem é chamado com "cartItems e o segundo com o argumento passado para a função', () =>{
    const cart = document.querySelector('.cart__items')
    saveCartItems(cart);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', cart);
  })
});
