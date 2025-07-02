import axios from "axios";

class ProductServices {
  static getAllProductsService = () => axios.get("/products");
}

export default ProductServices;
