//images logo
import logo from "../assets/logo.png";

// icons
import { CiUser, CiHeart, CiShoppingCart } from "react-icons/ci";

// clerk
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { saveSearchAction } from "../store/productSlice";

function NavbarComponent() {
  const [totalProductLS, setTotalProductLS] = useState(0);
  const [searchProducts, setSearchProducts] = useState("");
  const { totalProduct } = useSelector((state) => state.cartStore);
  const { favoriteTotal } = useSelector((state) => state.favoriteStore);

  const dispatch = useDispatch();

  useEffect(() => {
    let isTotal = JSON.parse(localStorage.getItem("cart_total"));
    if (isTotal) {
      setTotalProductLS(isTotal);
    } else {
      setTotalProductLS(0);
    }
  }, [totalProduct]);

  function handleSearchProduct() {
    dispatch(saveSearchAction(searchProducts));
    setSearchProducts("");
  }

  return (
    <div className="bg-mainBlue h-full lg:h-[100px] flex items-center py-[10px]">
      <div className="container w-[90%] mx-auto flex items-center justify-between flex-col lg:flex-row gap-[10px]">
        <Link to="/">
          <img src={logo} alt="logo-image" />
        </Link>

        {/*search bar */}
        <div className="bg-textWhite rounded-[20px]">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none px-[20px] py-[15px] rounded-[20px]"
            value={searchProducts}
            onChange={(e) => setSearchProducts(e.target.value)}
          />
          <button
            className="bg-mainYellow text-textWhite px-[30px] py-[15px] rounded-[20px]"
            onClick={handleSearchProduct}
          >
            Search
          </button>
        </div>

        {/*LoginSystem & CardFavorite */}
        <div className="flex items-center gap-[30px]">
          <div className="flex items-center gap-[5px]">
            <CiUser color="white" size={25} />
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <div className="flex items-center gap-[5px]">
            <CiHeart color="white" size={25} />
            <span className="bg-mainYellow text-textWhite rounded-full w-[20px] h-[20px] flex items-center justify-center">
              {favoriteTotal}
            </span>
            <Link to={"/favorite"} className="text-textWhite text-[18px]">
              Favorite
            </Link>
          </div>
          <div className="flex items-center gap-[5px]">
            <CiShoppingCart color="white" size={25} />
            <span className="bg-mainYellow text-textWhite rounded-full w-[20px] h-[20px] flex items-center justify-center">
              {totalProductLS}
            </span>
            <Link to="/cart" className="text-textWhite text-[18px]">
              Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarComponent;
