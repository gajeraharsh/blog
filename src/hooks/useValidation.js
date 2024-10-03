import { useState } from "react";

const useRequiredValidation = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    Object.keys(values).forEach((name) => {
      if (!values[name]) {
        newErrors[name] = `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } is required.`;
      }
    });
    setErrors(newErrors);
    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error on input change
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (event, callback) => {
    event.preventDefault();
    const validationErrors = validateFields(); // Validate fields on submit

    // Check if there are any errors
    const hasErrors = Object.values(validationErrors).some((error) => error);

    if (!hasErrors) {
      callback(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues
  };
};

export default useRequiredValidation;
