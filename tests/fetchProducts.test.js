require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Verifica se fetchProducts é uma função', () =>
    expect(typeof fetchProducts).toBe('function'));

  it('Verifica se a função fetchProducts foi chamada', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se a função fetchProducts foi chamada com o endpoint correto', async () => {
    const endPoint =
      'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });

  it('Verifica se a função fetchProducts retorna um objeto equivalente a computadorSearch', async () => {
    expect.assertions(1);
    const returnObject = await fetchProducts('computador');
    expect(returnObject).toEqual(computadorSearch.results);
  });

  it('Verifica se ao chamar a função fetchProducts sem argumentos, retorna o erro "You must provide an url"', async () => {
    expect.assertions(1);
    const returnObject = await fetchProducts();
    expect(returnObject).toEqual(new Error('You must provide an url'));
  });
});
