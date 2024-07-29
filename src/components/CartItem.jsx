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
      <div className="flex justify-between">
        <span>
          <p>{item.name}</p>
        </span>
        <span>
          <button className="btn-sm btn-circle"  onMouseDown={() => handleRemoveItem(item.id)}>-</button>
          {item.quantity}
          <button className="btn-sm btn-circle" onMouseDown={() => handleAddItem(item)}>+</button>
        </span>
      </div>
    );
}