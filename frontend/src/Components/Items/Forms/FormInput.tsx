import "./form.scss";

export const FormInput = ({
  label,
  index,
  error,
  handleChange,
  handleClick,
  disabled,
  ...inputProps
}: any) => {
  const { active } = inputProps;
  return (
    <div className="input-body">
      <div className="input-container">
        <label>{label}</label>
        <input
          className="form-input "
          onChange={handleChange}
          onClick={handleClick}
          disabled={active}
          {...inputProps}
        ></input>
      </div>
      <i className={`fa solid ${!error ? "fa-check success" : "fa-xmark"}`}></i>
    </div>
  );
};
