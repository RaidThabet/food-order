/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import Input from "./UI/Input";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values.city) {
    errors.city = "City is required";
  }

  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.street) {
    errors.street = "Street is required";
  }

  if (!values["postal-code"]) {
    errors["postal-code"] = "Postal code is required";
  }

  return errors;
};

export default function CheckoutFormik({ onSubmit, actions, totalPrice, errorMessage }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      street: "",
      "postal-code": "",
      city: "",
    },
    validate,
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <>
      <p className="text-black font-bold text-2xl text-center mb-2">
        Please fulfill this form
      </p>
      {errorMessage}
      <form
        className=" flex flex-col gap-8 max-xl:w-auto max-xl:h-auto"
        onSubmit={(event) => {
          event.preventDefault();
          formik.handleSubmit(formik.values);
        }}
      >
        <div className="flex flex-col max-sm:items-start items-center">
          <div className="flex justify-between max-sm:flex-col gap-3 max-sm:gap-0 w-full">
            <Input
              id="name"
              type="text"
              value={formik.values.name}
              isInvalid={formik.errors.name}
              onChange={formik.handleChange}
            >
              Full Name
            </Input>
            <Input
              id="city"
              type="text"
              value={formik.values.city}
              isInvalid={formik.errors.city}
              onChange={formik.handleChange}
            >
              City
            </Input>
          </div>
          <Input
            id="email"
            type="email"
            value={formik.values.email}
            isInvalid={formik.errors.email}
            onChange={formik.handleChange}
            isFullWidth
          >
            Email
          </Input>
          <div className="flex justify-between max-sm:flex-col gap-3 max-sm:gap-0 w-full">
            <Input
              id="street"
              type="text"
              value={formik.values.street}
              isInvalid={formik.errors.street}
              onChange={formik.handleChange}
            >
              Street
            </Input>
            <Input
              id="postal-code"
              type="text"
              value={formik.values["postal-code"]}
              isInvalid={formik.errors["postal-code"]}
              onChange={formik.handleChange}
            >
              Postal Code
            </Input>
          </div>
        </div>
        <div className="flex justify-end gap-4">{actions}</div>
      </form>
      <h2 className="font-bold text-xl text-amber-600 mt-4 text-right">
        Total Price: ${totalPrice}
      </h2>
    </>
  );
}
