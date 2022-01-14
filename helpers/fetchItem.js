const fetchItem = async (item) => {
  const url = `https://api.mercadolibre.com/items/${item}`;
  try {
  const productUrl = await fetch(url)
  .then((response) => response.json())
  .then((data) => data);
  return productUrl;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
