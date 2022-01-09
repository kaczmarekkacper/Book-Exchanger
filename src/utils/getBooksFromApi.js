const getBooksFromApi = async (barcode) => {
  let json = undefined;
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${barcode}`
    );
    json = await response.json();
  } catch (error) {
    console.error(error);
  }
  return json.items[0];
};

export default getBooksFromApi;
