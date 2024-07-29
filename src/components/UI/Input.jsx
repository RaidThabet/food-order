/* eslint-disable react/prop-types */
export default function Input({children, id, ...props}) {
    return (
      <label className=" form-control max-w-xs">
        <div className="label">
          <span className="label-text">{children}</span>
        </div>
        <input
          id={id}
          name={id}
          {...props}
          className=" input input-bordered w-full max-w-xs"
        />
      </label>
    );
    
}