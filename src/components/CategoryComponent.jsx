import React, { useEffect, useState } from "react";
import CategoryServices from "../services/CategoryServices";
import { useDispatch, useSelector } from "react-redux";
import { saveAllCategoryAction } from "../store/categorySlice";

function CategoryComponent() {
  const [toggleCategory, setToggleCategory] = useState(false);

  const dispatch = useDispatch();
  const { allCategory, isLoading } = useSelector(
    (state) => state.categoryStore
  );

  function handleToggleCategory() {
    setToggleCategory(!toggleCategory);
  }

  useEffect(() => {
    CategoryServices.getAllCategory()
      .then((res) => {
        dispatch(saveAllCategoryAction(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className=" bg-lightGray h-[100%] py-[10px] flex items-center">
      <div className="container  w-[90%] mx-auto flex items-center gap-[20px] h-full flex-col lg:flex-row">
        <button
          onClick={handleToggleCategory}
          className="bg-mainYellow px-[20px] py-[10px] text-textWhite rounded-lg"
        >
          Show Category
        </button>

        {isLoading ? (
          <ul className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[20px]">
            {toggleCategory &&
              allCategory.map((cat, idex) => {
                return (
                  <li
                    key={idex}
                    className="w-[200px] bg-mainBlue text-textWhite text-center rounded-lg px-[16px] py-[8px] hover:bg-mainYellow transition-all duration-500"
                  >
                    {cat}
                  </li>
                );
              })}
          </ul>
        ) : (
          <div>Loading Category</div>
        )}
      </div>
    </div>
  );
}

export default CategoryComponent;
