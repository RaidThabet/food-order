/* eslint-disable react/prop-types */
import Modal from "./UI/Modal";
import useFetch from "../hooks/useFetch";
import Error from "./Error";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import CheckoutForm from "./CheckoutForm";

const config = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export default function Checkout({open, onClose}) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const cartCtx = useContext(CartContext);

  const {
    data,
    error,
    isLoading: isSending,
    sendRequest,
    clearData,
    setError
  } = useFetch("http://localhost:3000/orders", config);
  
  let errorMessage = <></>

  if (error) {
    errorMessage = <Error message="Failed to submit order." />;
  }

  let actions = (
    <>
      {errorMessage}
      <form method="dialog">
        <button className="btn btn-ghost">Cancel</button>
      </form>
      <button type="submit" className="btn">
        Submit Order
      </button>
    </>
  );


  if (isSending) {
    actions = (
      <button disabled className="btn">
        <span className="loading loading-spinner"></span>
        Submitting your order...
      </button>
    );
  }

  let content = (
    <CheckoutForm onSubmit={handleSubmit} actions={actions}/>
  );

  if (data && !error && isSubmitted) {
      content = (
        <>
          <h2>Your order is submitted!</h2>
          <form method="dialog">
            <button className="btn " onClick={handleClearData}>
              Okay
            </button>
          </form>
        </>
      );
  }

  function handleClearData() {
    setError(null);
    cartCtx.clearCart();
    clearData();
    setIsSubmitted(false);
    onClose();
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

      setError(null);
      setIsSubmitted(true);
    }

    return (
      <Modal open={open} onClose={onClose}>
        {content}
      </Modal>
    );
}