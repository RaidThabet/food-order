/* eslint-disable react/prop-types */
import Input from "./UI/Input"

export default function CheckoutForm({onSubmit, actions}) {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
      <div className="flex justify-end gap-4">{actions}</div>
    </form>
    )
}