/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

export default function Meal({name, price, image}) {
    return (
      <div className="flex flex-col w-72 m-4 bg-stone-200 text-stone-950 rounded-md">
        <img src={`http://localhost:3000/${image}`} alt="" className="w-72 rounded-t-md" />
        <div className="flex justify-around items-center py-4">
          <span>
            <p>{name}</p>
            <p>${price}</p>
          </span>
          <span>
            <button className="btn btn-circle">+</button>
          </span>
        </div>
      </div>
    );
}