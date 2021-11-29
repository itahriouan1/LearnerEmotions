import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  EMPTY_CART,
} from '../constants/cartConstants';

export const cartReducer = (
  state = { cartItems: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: action.payload,
      };
      

    case REMOVE_ITEM_CART:
      return {
        ...state,
        cartItems: [],
      };

    case EMPTY_CART:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
