import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalProduct: 0,
    totalPrice: 0,
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
        state.totalPrice += Math.floor(action.payload.price);
      } else {
        //dodaj count + 1
        copyCart[findIndex].count++;
      }

      state.cart = copyCart;
      localStorage.setItem("cart_item", JSON.stringify(copyCart));
      localStorage.setItem("cart_total", JSON.stringify(state.totalProduct));
    },

    deleteFromCartAction: (state, action) => {
      let copyCart = [...state.cart];

      let findIndex = null;

      copyCart.find((item, index) => {
        if (item.id === action.payload.id) {
          findIndex = index;
          return;
        }
      });

      if (findIndex !== null) {
        copyCart.splice(findIndex, 1);
        state.totalProduct--;
        state.totalPrice = subTotal(copyCart);
      }

      state.cart = copyCart;
      localStorage.setItem("cart_item", JSON.stringify(copyCart));
      localStorage.setItem("cart_total", JSON.stringify(state.totalProduct));
    },
    setPriceHandlerAction: (state, action) => {
      const { increment, index } = action.payload;
      let copyCart = [...state.cart];

      copyCart[index].cartTotal += copyCart[index].price * increment;
      state.totalPrice = subTotal(copyCart);

      if (copyCart[index].count === 1 && increment === -1) {
        copyCart.splice(index, 1);
        state.totalProduct--;
      } else {
        copyCart[index].count += increment;
      }

      state.cart = copyCart;
      localStorage.setItem("cart_item", JSON.stringify(copyCart));
      localStorage.setItem("cart_total", JSON.stringify(state.totalProduct));
    },
  },
});

function subTotal(arrayCart) {
  return arrayCart.reduce((acc, current) => {
    return acc + current.cartTotal;
  }, 0);
}

export const { saveInCartAction, deleteFromCartAction, setPriceHandlerAction } =
  cartSlice.actions;
export default cartSlice.reducer;
