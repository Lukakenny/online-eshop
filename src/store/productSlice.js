import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    allProducts: [],
    isLoading: false,
    selectCategory: "",
    searchProduct: "",
  },
  reducers: {
    saveAllProductAction: (state, action) => {
      state.allProducts = action.payload;
      state.isLoading = true;
    },
    saveSelectCategoryAction: (state, action) => {
      state.selectCategory = action.payload;
    },
    saveSearchAction: (state, action) => {
      state.searchProduct = action.payload;
    },
  },
});

export const {
  saveAllProductAction,
  saveSelectCategoryAction,
  saveSearchAction,
} = productSlice.actions;
export default productSlice.reducer;
