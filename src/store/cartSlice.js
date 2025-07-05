import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalProduct: 0,
  },
  reducers: {
    saveInCartAction: (state, action) => {
      let copyCart = [...state.cart];

      //Logika
      //find index === nadji Duplikat
      let findIndex = null;

      copyCart.find((item, index) => {
        if (item.id === action.payload.id) {
          findIndex = index;
          return;
        }
      });

      //dodajemo

      if (findIndex === null) {
        //push
        copyCart.push({
          ...action.payload,
          count: 1,
          cartTotal: action.payload.price,
        });
        state.totalProduct++;
      } else {
        //dodaj count + 1
        copyCart[findIndex].count++;
      }

      state.cart = copyCart;
      localStorage.setItem("cart_item", JSON.stringify(copyCart));
      localStorage.setItem("cart_total", JSON.stringify(state.totalProduct));
    },

    deleteFromCartAction: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { saveInCartAction } = cartSlice.actions;
export default cartSlice.reducer;
