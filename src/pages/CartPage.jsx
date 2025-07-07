import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromCartAction,
  setPriceHandlerAction,
} from "../store/cartSlice";
import { useEffect, useState } from "react";

function CartPage() {
  const [cartData, setCartData] = useState([]);
  const { cart, totalPrice } = useSelector((state) => state.cartStore);
  const dispatch = useDispatch();

  useEffect(() => {
    setCartData(JSON.parse(localStorage.getItem("cart_item")));
  }, [cart]);

  function handleRemoveProduct(product) {
    dispatch(deleteFromCartAction(product));
  }

  return (
    <div>
      <div className="mt-p[50px]">
        <div className=" container mx-auto w-[90%] flex flex-col lg:flex-row gap-[20px]">
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 250 }}
              aria-label="simple table"
              className="w-full lg:w-[70%]"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                  <TableCell align="right">Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartData.map((product, index) => (
                  <TableRow
                    key={product.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <img
                        src={product.thumbnail}
                        alt=""
                        className="w-[90px] border border-mainBlue rounded-lg"
                      />
                    </TableCell>
                    <TableCell align="left">${product.price}</TableCell>
                    <TableCell align="left">
                      <div className="flex items-center">
                        <button
                          className="px-[8px] py-[4px] bg-slate-300 text-[18px]"
                          onClick={() =>
                            dispatch(
                              setPriceHandlerAction({
                                index,
                                increment: -1,
                                product,
                              })
                            )
                          }
                        >
                          -
                        </button>
                        <span className="px-[8px] py-[4px] bg-slate-300 text-[18px]">
                          {product.count}
                        </span>
                        <button
                          className="px-[8px] py-[4px] bg-slate-300 text-[18px]"
                          onClick={() => {
                            if (product.count < product.stock) {
                              dispatch(
                                setPriceHandlerAction({
                                  index,
                                  increment: 1,
                                  product,
                                })
                              );
                            }
                          }}
                        >
                          +
                        </button>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      ${Math.floor(product.cartTotal)}
                    </TableCell>
                    <TableCell align="right">
                      <button
                        className="text-red-400"
                        onClick={() => handleRemoveProduct(product)}
                      >
                        Remove
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="w-full lg:w-[30%]">
            <h2>CART TOTAL</h2>
            <span>${totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
