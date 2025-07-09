import { use, useEffect } from "react";
import ProductServices from "../services/ProductServices";
import { useDispatch, useSelector } from "react-redux";
import { saveAllProductAction } from "../store/productSlice";
import CardComponent from "../components/cardComponent";

function HomePage() {
  const { allProducts, isLoading, selectCategory, searchProduct } = useSelector(
    (state) => state.productStore
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectCategory) {
      ProductServices.getAllProductByCategory(selectCategory)
        .then((res) => {
          dispatch(saveAllProductAction(res.data.products));
        })
        .catch((err) => console.log(err));
    } else {
      ProductServices.getAllProductsService()
        .then((res) => {
          dispatch(saveAllProductAction(res.data.products));
        })
        .catch((err) => console.log(err));
    }
  }, [selectCategory]);

  useEffect(() => {
    ProductServices.getSearchProduct(searchProduct)
      .then((res) => dispatch(saveAllProductAction(res.data.products)))
      .catch((err) => console.log(err));
  }, [searchProduct]);

  return (
    <div className="container mx-auto w-[90%]">
      {isLoading ? (
        <div className="flex flex-wrap items-center justify-center gap-[10px]">
          {allProducts.map((product) => {
            return <CardComponent key={product.id} product={product} />;
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default HomePage;
