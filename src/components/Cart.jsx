import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useCartItems from "../hooks/useCartItems";
import { useCartActions } from "../hooks/useCartActions";

export default function Cart() {
  const { showCheckout } = useCartActions();
  const { cartItems: items, isCheckingOut } = useCartItems();

  const totalNumber = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  let content = (
    <div className="flex flex-col justify-around gap-6">
      <div className="flex flex-col gap-3">
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      </div>

      <div>
        <span className="text-amber-600 font-bold">
          Subtotal: ${totalAmount.toFixed(2)}
        </span>
        <div className="card-actions">
          <button className="btn btn-accent btn-block text-amber-600 bg-white border-amber-600 hover:bg-amber-600 hover:text-white hover:border-transparent" onClick={showCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );

  if (items.length === 0) {
    content = <p className="font-bold text-stone-500">Your cart is empty</p>;
  }

  return (
    <>
      {isCheckingOut && <Checkout />}
      <div className={" dropdown dropdown-end"}>
        <div tabIndex={0} className=" btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              C
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="bg-stone-700 badge badge-sm indicator-item">
              <span className="text-white">{totalNumber}</span>
            </span>
          </div>
        </div>
        <div
          tabIndex={0}
          className="bg-white card card-compact dropdown-content z-[1] mt-3 w-80 shadow"
        >
          <div className="card-body">
            {content}</div>
        </div>
      </div>
    </>
  );
}
