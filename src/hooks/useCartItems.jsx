import { useContext } from "react";

import { CartContext } from "../context/CartContext";

export default function useCartItems() {
  const { cartItems, isCheckingOut } = useContext(CartContext);

  return { cartItems, isCheckingOut };
}
