/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useCartActions } from "../hooks/useCartActions";

export default function Meal({ item }) {
  const { addItem } = useCartActions();

  return (
    <div className="flex flex-col w-72 m-4 bg-stone-200 text-stone-950 rounded-md">
      <img
        src={`http://localhost:3000/${item.image}`}
        alt=""
        className="w-72 h-72 rounded-t-md"
      />
      <div className="flex flex-grow justify-between px-1 items-center gap-14 py-3">
        <span>
          <p>{item.name}</p>
          <p className="text-bold">${item.price}</p>
        </span>
        <span>
          <button className="btn btn-circle" onClick={() => addItem(item)}>
            +
          </button>
        </span>
      </div>
    </div>
  );
}
