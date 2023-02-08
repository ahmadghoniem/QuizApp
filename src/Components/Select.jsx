const Select = ({
  label,
  options,
  currentVal,
  handleChange,
  stateToChange,
}) => {
  return (
    <div>
      <label htmlFor={stateToChange}>
        {label}
        <select id={stateToChange} value={currentVal} onChange={handleChange}>
          {options.map(function ({ label, value } = options) {
            return <option value={value}>{label}</option>;
          })}
        </select>
      </label>
    </div>
  );
};
export default Select;
