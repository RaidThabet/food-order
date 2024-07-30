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
      {/* {errorMessage} */}
      <button
        type="button"
        className="btn btn-ghost text-black"
        onClick={handleCancelCheckout}
      >
        Cancel
      </button>
      <button type="submit" className="btn btn-accent  hover:bg-amber-500 border-amber-600 bg-amber-600 text-white hover:border-transparent">
        Submit Order
      </button>
    </>
  );

  if (isSending) {
    actions = (
      <button type="button" className="btn hover:border-transparent bg-amber-600 text-white hover:bg-amber-500 border-amber-600">
        <span className="loading loading-spinner  "></span>
        Submitting your order...
      </button>
    );
  }

  if (data && !error) {
    return (
      <Modal open={isCheckingOut} onClose={handleClearData}>
        <div className="flex flex-col gap-4 p-8">
          <p className="text-center text-amber-600 font-bold text-2xl">
            Your order is submitted!
          </p>
          <p className="text-stone-700 font-bold">
            We will get back to you with more details via email within the next
            few minutes.
          </p>
          <div className="flex justify-center items-center">
            <button
              className="hover:border-transparent btn hover:bg-amber-500 border-amber-600 bg-amber-600 text-white px-12"
              onClick={handleClearData}
            >
              Okay
            </button>
          </div>
        </div>
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
        errorMessage={errorMessage}
      />
    </Modal>
  );
}
