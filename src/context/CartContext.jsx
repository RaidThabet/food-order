/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useReducer } from "react";

export const CartContext = createContext({
    cartItems: [], // { id name, price, quantity }
    addItem: () => {},
    removeItem: () => {},
    clearCart: () => {},
    isCheckingOut: false,
    showCheckout: () => {},
    hideCheckout: () => {}
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
    } else if (action.type === "CLEAR") {
        return {...state, cartItems: []};
    } else if (action.type === "SHOW_CHECKOUT") {
        return {...state, isCheckingOut: true};
    } else if (action.type === "HIDE_CHECKOUT") {
        return {...state, isCheckingOut: false};
    }

    return {...state};
}

export default function CartContextProvider({children}) {
    const [cart, dispatchCart] = useReducer(cartReducer, {cartItems: [], isCheckingOut: false});

    function addItem(item) {
        dispatchCart({type: "ADD", item})
    }

    function removeItem(id) {
        dispatchCart({type: "REMOVE", id})
    }

    function clearCart() {
        dispatchCart({type: "CLEAR"})
    }

    function showCheckout() {
        dispatchCart({type: "SHOW_CHECKOUT"});
    }

    function hideCheckout() {
        dispatchCart({type: "HIDE_CHECKOUT"});
    }

    const cartContext = {cartItems: cart.cartItems, addItem, removeItem, clearCart, isCheckingOut: cart.isCheckingOut, showCheckout, hideCheckout}

    return (
      <CartContext.Provider value={cartContext}>
        {children}
      </CartContext.Provider>
    );
}