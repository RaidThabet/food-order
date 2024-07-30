import { useContext } from "react";

import { CartContext } from "../context/CartContext";

export function useCartActions() {
  const { addItem, removeItem, clearCart, showCheckout, hideCheckout } =
    useContext(CartContext);
  return { addItem, removeItem, clearCart, showCheckout, hideCheckout };
}
