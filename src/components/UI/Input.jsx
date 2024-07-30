/* eslint-disable react/prop-types */
export default function Input({children, isFullWidth, id, isInvalid, ...props}) {
    return (
      <label
        className={
          " form-control max-w-full " + (isFullWidth ? "w-full" : "w-auto")
        }
      >
        <div className="label">
          <span className="label-text">{children}</span>
        </div>
        <input
          id={id}
          name={id}
          {...props}
          className="input input-bordered max-w-full w-auto"
        />
        {isInvalid && (
          <div className="label">
            <span className="label-text-alt">{isInvalid}</span>
          </div>
        )}
      </label>
    );
    
}