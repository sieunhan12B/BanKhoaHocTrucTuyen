import React from "react";

const InputCustom = ({
  labelContent,
  id,
  placeholder,
  name,
  onChange,
  value,
  classWrapper = "",
  onBlur,
  error,
  touched,
  typeInput = "text",
  readOnly = false,
  classNameInput = "border bg-gray-50 p-2.5",
}) => {
  return (
    <div className={classWrapper}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {labelContent}
      </label>
      <input
        readOnly={readOnly}
        type={typeInput}
        id={id}
        className={`${classNameInput}  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full `}
        placeholder={placeholder}
        // value={value.hoTen}
        // onChange={handleChange}
        name={name}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />
      {error && touched ? <p className="text-red-500">{error}</p> : null}
    </div>
  );
};

export default InputCustom;
