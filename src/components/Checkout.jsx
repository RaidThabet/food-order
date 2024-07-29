/* eslint-disable react/prop-types */
import Input from "./UI/Input";
import Modal from "./UI/Modal";
import useFetch from "../hooks/useFetch";
import Error from "./Error";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const config = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export default function Checkout({open, onClose}) {
  const cartCtx = useContext(CartContext);

  const {
    data,
    error,
    isLoading: isSending,
    sendRequest,
    clearData,
  } = useFetch("http://localhost:3000/orders", config);

  let actions = (
    <>
      <form method="dialog">
        <button className="btn btn-ghost">Cancel</button>
      </form>
      <button type="submit" className="btn">
        Submit Order
      </button>
    </>
  );

  if (error) {
    actions = <Error message="Failed to submit order." />;
  }

  if (isSending) {
    actions = (
      <button className="btn">
        <span className="loading loading-spinner"></span>
        Submitting your order...
      </button>
    );
  }

  function handleClearData() {
    cartCtx.clearCart();
    clearData();
  }

    function handleSubmit(event) {
      event.preventDefault();

      const fd = new FormData(event.target);
      const data = Object.fromEntries(fd.entries());

      sendRequest(
        JSON.stringify({
          order: {
            items: cartCtx.cartItems,
            customer: data,
          },
        })
      );
      
    }

    return (
      <Modal open={open} onClose={onClose}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col flex-grow">
            <span className="flex flex-col gap-3">
              <span className="flex gap-3">
                <Input id="name" type="text">
                  Full Name
                </Input>
                <Input id="city" type="text">
                  City
                </Input>
              </span>
              <Input id="email" type="email">
                Email
              </Input>
            </span>
            <span className="flex gap-3">
              <Input id="street" type="text">
                Street
              </Input>
              <Input id="postal-code" type="text">
                Postal Code
              </Input>
            </span>
          </div>
          <div className="flex justify-end gap-4">
            {actions}
          </div>
        </form>
      </Modal>
    );
}