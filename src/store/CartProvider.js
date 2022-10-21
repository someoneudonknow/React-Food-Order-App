import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultState = {
  items: [],
  totalAmounts: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const updatedTotalAmount =
        state.totalAmounts + action.item.amount * action.item.price;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      let updatedItems;
      const existingCartItem = state.items[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };

        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }
      return {
        totalAmounts: updatedTotalAmount,
        items: updatedItems,
      };
    case "REMOVE_ITEM":
      const existingRemoveIndex = state.items.findIndex(
        (item) => item.id === action.id
        );
        const existingRemoveItem = state.items[existingRemoveIndex];
        const totalAmountUpdated = state.totalAmounts - existingRemoveItem.price;
        let updatedItemsAfterDelete;

        if(existingRemoveItem.amount === 1){
          updatedItemsAfterDelete = state.items.filter((item) => {
            return item.id !== action.id;
          });
        }else{
          const updatedItem ={...existingRemoveItem, amount: existingRemoveItem.amount - 1}
          updatedItemsAfterDelete = [...state.items];
          updatedItemsAfterDelete[existingRemoveIndex] = updatedItem;
        }

        return {
          totalAmounts: totalAmountUpdated,
          items: updatedItemsAfterDelete,
        };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmounts,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
