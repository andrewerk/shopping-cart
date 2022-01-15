const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Verifica se ao chamar saveCartItems, localStorage.setItem é chamado', () =>{
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  })
  it('Verifica se ao chamar saveCartItems com argumento <ol><li>Item</li></ol>, localStorage.setItem é chamado com "cartItems e o segundo com o argumento passado para a função', () =>{
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});
