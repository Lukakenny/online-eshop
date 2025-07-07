import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductServices from "../services/ProductServices";
import { Rating } from "@mui/material";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { saveInCartAction } from "../store/cartSlice";
import { updateFavoriteAction } from "../store/favoriteSlice";

function SingleProductPage() {
  const [singleProduct, setSingleProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [countProduct, setCountProduct] = useState(1);
  const [favoriteIdIcon, setFavoriteIdIcon] = useState(null);
  const { allFavorite } = useSelector((state) => state.favoriteStore);

  //dispatch from redux
  const dispatch = useDispatch();

  //3 stavri da uradimo
  //1.uzmi id
  let { id } = useParams();
  //2.Pokreni REQ i uzmi proizvod
  useEffect(() => {
    ProductServices.getSingleProductService(id)
      .then((res) => {
        setSingleProduct(res.data);
        setIsLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (allFavorite.length > 0) {
      allFavorite.find((item) => {
        if (item.id === singleProduct.id) {
          setFavoriteIdIcon(item.id);
          return;
        }
      });
    } else {
      setFavoriteIdIcon(null);
    }
  }, [allFavorite]);

  function handleImage(index) {
    setCurrentImage(index);
  }

  //funkcija koja salje proizvod u cart
  function handleProductCart() {
    dispatch(saveInCartAction(singleProduct));
  }

  return (
    <div className=" px-[20px]">
      {isLoading ? (
        <div
          className="container mx-auto w-[90%] flex flex-col
         lg:flex-row gap-[40px] lg:gap-[20px]"
        >
          {/*Left Side */}
          <div className=" w-full  lg:w-[50%]">
            <img
              src={singleProduct.images[currentImage]}
              alt=""
              className="max-h-[400px]"
            />
            <div className="flex items-center justify-center gap-[20px]">
              {singleProduct.images.map((el, index) => {
                return (
                  <img
                    src={el}
                    alt=""
                    key={index}
                    className={
                      currentImage === index
                        ? "w-[100px] h-[100px] border border-mainBlue p-[10px] rounded-lg cursor-pointer"
                        : "w-[100px] h-[100px] border border-grayColor p-[10px] rounded-lg cursor-pointer"
                    }
                    onClick={() => handleImage(index)}
                  />
                );
              })}
            </div>
          </div>

          {/*Right Side */}
          <div className="w-full lg:w-[50%] flex flex-col  gap-[20px]">
            <h2 className="text-mainBlue text-[36px] ">
              {singleProduct.title}
            </h2>
            <h5 className="font-semibold text-[20px]">{singleProduct.price}</h5>
            <Rating value={singleProduct.rating} readOnly />
            <div className="flex items-center gap-[10px]">
              <span>Availability:</span>
              {singleProduct.stock > 0 ? (
                <h3 className="flex items-center text-[#30BD57] gap-[5px] font-semibold">
                  <FaCheck /> In stock
                </h3>
              ) : (
                <h3 className="flex items-center text-[#FF0000] gap-[5px] font-semibold">
                  <ImCross /> Out of stock
                </h3>
              )}
            </div>
            <p className="text-grayColor">
              Hurry up! only{" "}
              <span className="text-mainBlue">{singleProduct.stock}</span>{" "}
              product left in stock!
            </p>
            <div className="flex items-center gap-[20px]">
              <span>Tags:</span>
              <ul className="flex items-center gap-[10px]">
                {singleProduct.tags.map((tag, index) => {
                  return (
                    <li
                      key={index}
                      className="bg-lightGray px-[8px] py-[4px] rounded-lg text-grey-500"
                    >
                      #{tag}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex items-center gap-[20px]">
              <p>Quantity:</p>
              <div className="flex items-center">
                <button className="bg-lightGray text-gray-500 px-[10px] py-[4px] border border-gray-500">
                  -
                </button>
                <span className="bg-lightGray text-gray-500 px-[20px] py-[4px] border border-gray-500">
                  {countProduct}
                </span>
                <button className="bg-lightGray text-gray-500 px-[10px] py-[4px] border border-gray-500">
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center mt-[30px] gap-[20px]">
              <Link
                to={"/cart"}
                className="bg-mainYellow text-white px-[26px]
              py-[13px] rounded-lg"
                onClick={handleProductCart}
              >
                Add To Cart
              </Link>
              <div className=" bg-[#EEE] p-[10px] rounded-full">
                {favoriteIdIcon === parseInt(id) ? (
                  <CiHeart
                    size={30}
                    color="red"
                    onClick={() =>
                      dispatch(updateFavoriteAction(singleProduct))
                    }
                  />
                ) : (
                  <CiHeart
                    size={30}
                    onClick={() =>
                      dispatch(updateFavoriteAction(singleProduct))
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
}

export default SingleProductPage;
