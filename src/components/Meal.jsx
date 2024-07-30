/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useCartActions } from "../hooks/useCartActions";

export default function Meal({ item }) {
  const { addItem } = useCartActions();

  return (
    <div className="flex flex-col w-[22rem] h-80 m-4 bg-stone-200 text-stone-950 rounded-xl overflow-hidden hover:scale-105 transition-transform" >
      <div className="relative w-full h-5/6 overflow-hidden">
        <img
          src={`http://localhost:3000/${item.image}`}
          alt=""
          className="absolute inset-0 w-full h-full rounded-t-xl"
        />
      </div>
      <div className="flex flex-grow justify-between px-4 items-center py-3">
        <span>
          <p className="font-bold">{item.name}</p>
          <p className="text-bold">${item.price}</p>
        </span>
        <span>
          <button className="btn text-white bg-stone-800 hover:bg-stone-500 border-transparent text-sm text-center" onClick={() => addItem(item)}>
            Add to cart
          </button>
        </span>
      </div>
    </div>
  );
}
