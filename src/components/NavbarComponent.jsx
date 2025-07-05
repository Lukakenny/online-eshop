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
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function NavbarComponent() {
  const [totalProductLS, setTotalProductLS] = useState(0);

  const { totalProduct } = useSelector((state) => state.cartStore);

  useEffect(() => {
    let isTotal = JSON.parse(localStorage.getItem("cart_total"));
    if (isTotal) {
      setTotalProductLS(isTotal);
    }
  }, [totalProduct]);

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
          />
          <button className="bg-mainYellow text-textWhite px-[30px] py-[15px] rounded-[20px]">
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
              0
            </span>
            <span className="text-textWhite text-[18px]">Favorite</span>
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
