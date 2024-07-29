/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useReducer } from "react";

export const CartContext = createContext({
    cartItems: [], // { name, price, quantity }
    addItem: () => {},
    removeItem: () => {}
})

function cartReducer(state, action) {
    let updatedCart = [...state.cartItems];
    if (action.type === "ADD") {
        const existingItemIndex = state.cartItems.findIndex(item => item.id === action.item.id);
        let newQuantity = 1;
        if (existingItemIndex > -1) { // item already exists in the cart
            const existingItem = state.cartItems[existingItemIndex];
            newQuantity = existingItem.quantity + 1;
            const updatedItem = {...existingItem, quantity: newQuantity};
            updatedCart[existingItemIndex] = updatedItem;
        } else { // the intem doesn't exist
            const newItem = {...action.item, quantity: newQuantity};
            updatedCart.push(newItem);
        }

        return {...state, cartItems: updatedCart};
    } else if (action.type === "REMOVE") {
        const existingItemIndex = state.cartItems.findIndex(item => item.id === action.id);
        const existingItem = updatedCart[existingItemIndex];
        if (existingItem.quantity === 1) {
            updatedCart.splice(existingItemIndex, 1);
        } else {
            let updatedItem = {...existingItem, quantity: existingItem.quantity - 1};
            updatedCart[existingItemIndex] = updatedItem;
        }
        return {...state, cartItems: updatedCart};
    }
}

export default function CartContextProvider({children}) {
    const [cart, dispatchCart] = useReducer(cartReducer, {cartItems: []});

    function addItem(item) {
        dispatchCart({type: "ADD", item})
    }

    function removeItem(id) {
        dispatchCart({type: "REMOVE", id})
    }

    const cartContext = {cartItems: cart.cartItems, addItem, removeItem}

    return (
      <CartContext.Provider value={cartContext}>
        {children}
      </CartContext.Provider>
    );
}