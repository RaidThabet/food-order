/* eslint-disable react/prop-types */
export default function Input({children, isFullWidth, id, isInvalid, ...props}) {
    return (
      <label
        className={
          " form-control max-w-full max-sm:w-full " + (isFullWidth ? "w-full" : "w-auto")
        }
      >
        <div className="label">
          <span className="lg:max-xl:text-2xl text-stone-800 font-bold label-text">{children}</span>
        </div>
        <input
          id={id}
          name={id}
          {...props}
          className={`lg:max-xl:text-2xl bg-stone-200 text-black input input-bordered ${isInvalid && "input-error"} max-w-full w-auto`}
        />
        {isInvalid && (
          <div className="label">
            <span className="text-red-600 label-text-alt">{isInvalid}</span>
          </div>
        )}
      </label>
    );
    
}