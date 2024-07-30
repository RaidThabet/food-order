/* eslint-disable react/prop-types */
import { useContext } from "react";

import { CartContext } from "../context/CartContext";

export default function CartItem({item}) {
    const cartCtx = useContext(CartContext);

    function handleAddItem(item) {
        cartCtx.addItem(item);
    }

    function handleRemoveItem(id) {
        cartCtx.removeItem(id);
    }

    return (
      <div className="flex justify-between font-bold text-black">
        <span>
          <p className="w-36">{item.name}</p>
        </span>
        <span>
          <button className="w-4 h-4 text-black"  onMouseDown={() => handleRemoveItem(item.id)}>-</button>
          {item.quantity}
          <button className="w-4 h-4 text-black" onMouseDown={() => handleAddItem(item)}>+</button>
        </span>
        <span className="text-right w-12">${item.price}</span>
      </div>
    );
}