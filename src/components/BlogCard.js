// components/BlogCard.js
import { formatISODate } from "@/utils/global";
import React from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const BlogCard = ({ blog, handleEdit, deleteBlog }) => {
  const { name, description, updatedAt } = blog;

  return (
    <div className="border p-10 rounded-lg shadow-sm hover:shadow-md transition-shadow relative">
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      
      {/* Description container with fixed height and multiline truncation */}
      <p className="text-gray-700 mb-3 h-24 overflow-hidden line-clamp-3">
        {description}
      </p>

      <p className="text-sm text-gray-500">{formatISODate(updatedAt)}</p>

      <div className="absolute top-6 right-5 flex gap-3">
        <div className="cursor-pointer">
          <MdEdit onClick={(e) => {
            e.stopPropagation();
            handleEdit(blog);
          }} />
        </div>
        <div className="cursor-pointer">
          <MdDelete onClick={(e) => {
            e.stopPropagation();
            deleteBlog(blog?._id);
          }} />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
