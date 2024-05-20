import "./styles.scss";

function Input({
  inputType,
  inputName,
  inputValue,
  changeValue,
  labelText,
  errorValidation = false
}) {
  return(<div className="input-wrapper">
    <label>{labelText}
      <input
        type={inputType}
        name={inputName}
        value={inputValue}
        onChange={changeValue}
        required
      />
      { errorValidation && <div className="error-input">{errorValidation}</div>}
    </label>
  </div>);
}

export default Input;