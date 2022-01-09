const getBooksFromApi = async (barcode) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${barcode}`
    );
    const json = await response.json();
  } catch (error) {
    console.error(error);
  }
  return json.items[0];
};

export default getBooksFromApi;
