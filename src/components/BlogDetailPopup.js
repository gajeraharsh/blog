import { formatISODate } from "@/utils/global";
import React from "react";

const BlogDetailPopup = ({ isOpen, onClose, blogData }) => {
  if (!isOpen || !blogData) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[40rem]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          {blogData.name}
        </h2>

        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed">
            {blogData.description}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 italic text-sm">
            Updated on: {formatISODate(blogData.createdAt)}
          </p>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPopup;
