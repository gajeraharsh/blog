import { formatISODate } from "@/utils/global";
import React, { useState, useEffect } from "react";
import useRequiredValidation from "../hooks/useValidation";

const BlogPopup = ({ isOpen, onClose, onSubmit, reset, initialData }) => {
  const { values, errors, handleChange, handleSubmit, setValues } =
    useRequiredValidation({
      name: "",
      description: "",
    });

  useEffect(() => {
    if (initialData) {
      setValues({
        name: initialData?.name,
        description: initialData?.description,
      });
    }
  }, [initialData]);

  const submitCallback = async (data) => {
    await onSubmit(data, initialData?._id);
    onClose();
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[40rem]">
        <h2 className="text-2xl font-bold mb-4">
          {initialData ? "Update Blog" : "Create Blog"}
        </h2>
        <form onSubmit={(e) => handleSubmit(e, submitCallback)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={values.name}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              name="name"
            />
            {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={values.description}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              name="description"
              rows={14}
            />
            {errors.description && (
              <span style={{ color: "red" }}>{errors.description}</span>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogPopup;
