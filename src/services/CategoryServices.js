import axios from "axios";

class CategoryServices {
  static getAllCategory = () => axios.get("/products/category-list");
}

export default CategoryServices;
