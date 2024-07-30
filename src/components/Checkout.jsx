/* eslint-disable react/prop-types */
import Modal from "./UI/Modal";
import useFetch from "../hooks/useFetch";
import Error from "./Error";
import CheckoutForm from "./CheckoutForm";
import useCartItems from "../hooks/useCartItems";
import { useCartActions } from "../hooks/useCartActions";

const config = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export default function Checkout() {
  const { cartItems, isCheckingOut } = useCartItems();
  const { clearCart, hideCheckout } = useCartActions();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const {
    data,
    error,
    isLoading: isSending,
    sendRequest,
    clearData,
    setError,
  } = useFetch("http://localhost:3000/orders", config);

  let errorMessage;

  if (error) {
    errorMessage = <Error message="Failed to submit order." />;
  }

  let actions = (
    <>
      {errorMessage}
      <button
        type="button"
        className="btn btn-ghost"
        onClick={handleCancelCheckout}
      >
        Cancel
      </button>
      <button type="submit" className="btn">
        Submit Order
      </button>
    </>
  );

  if (isSending) {
    actions = (
      <button className="btn">
        <span className="loading loading-spinner"></span>
        Submitting your order...
      </button>
    );
  }

  if (data && !error) {
    return (
      <Modal open={isCheckingOut} onClose={handleClearData}>
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
    hideCheckout();
    clearCart();
    setError(null);
    clearData();
  }

  function handleCancelCheckout() {
    hideCheckout();
    setError(null);
    clearData();
  }

  function handleSubmit(values) {
    sendRequest(
      JSON.stringify({
        order: {
          items: cartItems,
          customer: values,
        },
      })
    );

    setError(null);
  }

  return (
    <Modal open={isCheckingOut} onClose={handleCancelCheckout}>
      <CheckoutForm
        onSubmit={handleSubmit}
        actions={actions}
        totalPrice={totalPrice}
      />
    </Modal>
  );
}
