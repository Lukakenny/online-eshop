//icons
import { CiLocationOn, CiDeliveryTruck } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";

function HeaderComponent({ setActiveHeader }) {
  return (
    <div className="w-[90%] container mx-auto">
      <div className=" flex items-center justify-between h-[80px] flex-col py-[10px] lg:flex-row">
        <p>
          Need help? Call us:{" "}
          <a className="text-blue-500" href="tel:+(+98) 0234 456 789">
            (+98) 0234 456 789
          </a>
        </p>

        {/* right side */}
        <div className="flex items-center gap-[36px]">
          <div className="flex items-center gap-[5px]">
            <CiLocationOn size={24} />
            <span>Our Store</span>
          </div>

          <div className="flex items-center gap-[5px] ">
            <CiDeliveryTruck size={24} />
            <span>Track your order</span>
            <IoIosClose
              size={24}
              onClick={() => {
                setActiveHeader(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
