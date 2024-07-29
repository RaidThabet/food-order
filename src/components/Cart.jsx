import { useContext, useState } from "react";

import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";


export default function Cart() {
    const [open, setOpen] = useState(false);


    const cartCtx = useContext(CartContext);
    const items = cartCtx.cartItems;

    const totalNumber = items.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);


    let content = (
      <>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
        <span className="text-info">Subtotal: ${totalAmount.toFixed(2)}</span>
        <div className="card-actions">
          <button className="btn btn-accent btn-block" onClick={handleOpenCheckout}>Checkout</button>
        </div>
      </>
    );

    if (items.length === 0) {
        content = <p>Your cart is empty</p>
    }

    function handleOpenCheckout() {
        setOpen(prev => !prev);
    }


  return (
    <>
      <Checkout open={open} onClose={() => setOpen(false)}/>
      <div className={"dropdown dropdown-end"}>
        <div tabIndex={0} className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm indicator-item">{totalNumber}</span>
          </div>
        </div>
        <div
          tabIndex={0}
          className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-80 shadow"
        >
          <div className="card-body">{content}</div>
        </div>
      </div>
    </>
  );
}
