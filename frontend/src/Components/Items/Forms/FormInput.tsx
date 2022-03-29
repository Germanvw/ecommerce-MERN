import "./form.scss";

export const FormInput = ({
  handleChange,
  type,
  label,
  ...inputProps
}: any) => {
  return (
    <div className={label ? "input-wrapper-label" : "input-wrapper"}>
      {label && <label>{label}</label>}
      <div className="input-body">
        <i
          className={`fa-solid ${
            type === "password"
              ? "fa-lock"
              : type === "text"
              ? "fa-user"
              : "fa-envelope"
          }`}
        ></i>
        <input
          className="form-input"
          onChange={handleChange}
          type={type}
          {...inputProps}
        ></input>
      </div>
    </div>
  );
};
