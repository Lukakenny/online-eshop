import axios from "axios";

class ProductServices {
  static getAllProductsService = () => axios.get("/products");
  static getSingleProductService = (id) => axios.get(`/products/${id}`);
}

export default ProductServices;
