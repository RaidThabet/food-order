/* eslint-disable react/prop-types */
import Modal from "./UI/Modal";
import useFetch from "../hooks/useFetch";
import Error from "./Error";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CheckoutFormik from "./CheckoutForm";

const config = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export default function Checkout({ open, onClose }) {
  // const [isSubmitted, setIsSubmitted] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalPrice = cartCtx.cartItems.reduce((total, item) => total + item.quantity * item.price, 0)

  const {
    data,
    error,
    isLoading: isSending,
    sendRequest,
    clearData,
    setError,
  } = useFetch("http://localhost:3000/orders", config);

  console.log("Infos from useFetch: ", data, error, isSending);

  let errorMessage;

  if (error) {
    errorMessage = <Error message="Failed to submit order." />;
  }

  let actions = (
    <>
      {errorMessage}
      <button type="button" className="btn btn-ghost" onClick={handleCancelCheckout}>
        Cancel
      </button>
      <button type="submit" className="btn">
        Submit Order
      </button>
    </>
  );

  if (isSending) {
    actions = (
      <button  className="btn">
        <span className="loading loading-spinner"></span>
        Submitting your order...
      </button>
    );
  }


  if (data && !error) {
    return (
      <Modal open={open} onClose={onClose}>
        <>
          <h2>Your order is submitted!</h2>
          <form method="dialog">
            <button className="btn " onClick={handleClearData}>
              Okay
            </button>
          </form>
        </>
      </Modal>
    );
  }

  function handleClearData() {
    handleCancelCheckout();
    cartCtx.clearCart();
  }

  function handleCancelCheckout() {
    onClose();
    setError(null);
    clearData();
  }

  function handleSubmit(values) {
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.cartItems,
          customer: values,
        },
      })
    );

    setError(null);
  }

  return (
    <Modal open={open} onClose={onClose}>
      <CheckoutFormik onSubmit={handleSubmit} actions={actions} totalPrice={totalPrice}/>
    </Modal>
  );
}
