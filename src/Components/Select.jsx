const Select = ({
  label,
  options,
  currentVal,
  handleChange,
  stateToChange,
}) => {
  return (
    <label className="select" htmlFor={stateToChange}>
      {label}
      <select id={stateToChange} value={currentVal} onChange={handleChange}>
        {options.map(function ({ label, value } = options) {
          return <option value={value}>{label}</option>;
        })}
      </select>
    </label>
  );
};
export default Select;
