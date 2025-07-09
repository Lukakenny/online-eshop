import axios from "axios";

class ProductServices {
  static getAllProductsService = () => axios.get("/products");
  static getSingleProductService = (id) => axios.get(`/products/${id}`);
  static getAllProductByCategory = (category) =>
    axios.get(`/products/category/${category}`);
  static getSearchProduct = (search) =>
    axios.get(`/products/search?q=${search}`);
}

export default ProductServices;
