import axios from 'axios';
import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  EMPTY_CART,
} from '../constants/cartConstants';

export const addItemToCart = (idSession) => async (dispatch) => {

  dispatch({
    type: ADD_TO_CART,
    payload: idSession,
  });

  localStorage.setItem('cartItems', JSON.stringify(idSession));
};

export const removeItemFromCart = (idSession) => async (dispatch) => {
  dispatch({
    type: REMOVE_ITEM_CART,
    payload: idSession,
  });
  
  localStorage.removeItem('cartItems');

};


export const emptyCart = () => async (dispatch) => {
  dispatch({
    type: EMPTY_CART,
  });
};
