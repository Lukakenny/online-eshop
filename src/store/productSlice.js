import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    allProducts: [],
    isLoading: false,
  },
  reducers: {
    saveAllProductAction: (state, action) => {
      state.allProducts = action.payload;
      state.isLoading = true;
    },
  },
});

export const { saveAllProductAction } = productSlice.actions;
export default productSlice.reducer;
