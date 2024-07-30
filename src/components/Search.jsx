/* eslint-disable no-unused-vars */
import { useContext } from "react";

import { MealsContext } from "../context/MealsContext";

export default function Search() {
    const mealsCtx = useContext(MealsContext);

    function handleChange(event) {
        const {value} = event.target;
        mealsCtx.filterMeals(value);
    }

  return (
    <div className="form-control">
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered bg-white text-black w-24 md:w-auto"
        onChange={handleChange}
      />
    </div>
  );
}
