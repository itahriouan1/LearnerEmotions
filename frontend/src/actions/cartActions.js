import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  EMPTY_CART,
} from "../constants/cartConstants";

export const addItemToCart =
  (idSession, useridCartItems, stream) => async (dispatch) => {
    const data = {
      idSession: idSession,
      useridCartItems: useridCartItems,
      stream: stream,
    };
    dispatch({
      type: ADD_TO_CART,
      payload: data,
    });

    // localStorage.setItem('datacCartItems', JSON.stringify(data));
    localStorage.setItem("cartItems", JSON.stringify(idSession));
    localStorage.setItem("useridCartItems", JSON.stringify(useridCartItems));
  };

export const removeItemFromCart =
  (idSession, useridCartItems) => async (dispatch) => {
    const data = {
      idSession: idSession,
      useridCartItems: useridCartItems,
    };
    dispatch({
      type: REMOVE_ITEM_CART,
      payload: idSession,
    });

    localStorage.removeItem("dataCartItems");
  };

export const emptyCart = () => async (dispatch) => {
  dispatch({
    type: EMPTY_CART,
  });
};
