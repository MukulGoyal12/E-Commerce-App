//formik input component
const Input = ({ name, values, errors, touched, handleChange, handleBlur }) => {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <div className="flex gap-10">
        <label htmlFor={name}>
          {name.at(0).toUpperCase() + name.slice(1).toLowerCase()}
          <span className="text-red-500">*</span>
        </label>
        {touched[name] && errors[name] && (
          <div style={{ color: "red" }}>
            {errors[name].at(0).toUpperCase() + errors[name].slice(1)}
          </div>
        )}
      </div>
      <input
        className="border border-gray-300 p-2 "
        id={name}
        name={name}
        type={name === "fullName" ? "text" : name}
        onChange={handleChange}
        value={values[name]}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default Input;
