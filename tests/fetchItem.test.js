require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Verifica se fetchItem é uma função', () =>
  expect(typeof fetchItem).toBe('function'));

it('Verifica se a função fetchItem foi chamada', async () => {
  expect.assertions(1);
  await fetchItem('MLB1615760527');
  expect(fetch).toHaveBeenCalled();
});

it('Verifica se a função fetchItem foi chamada com o endpoint correto', async () => {
  const endPoint =
    'https://api.mercadolibre.com/items/MLB1615760527';
  expect.assertions(1);
  await fetchItem('MLB1615760527');
  expect(fetch).toHaveBeenCalledWith(endPoint);
});

it('Verifica se a função fetchItem retorna um objeto equivalente a item', async () => {
  expect.assertions(1);
  const returnObject = await fetchItem('MLB1615760527');
  expect(returnObject).toEqual(item);
});

it('Verifica se ao chamar a função fetchItem sem argumentos, retorna o erro "You must provide an url"', async () => {
  expect.assertions(1);
  const returnObject = await fetchItem();
  expect(returnObject).toEqual(new Error('You must provide an url'));
});
});
