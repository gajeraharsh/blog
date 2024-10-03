import React, { useEffect, useInsertionEffect, useState } from "react";
import { toast } from "react-toastify";

function useBlog() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [viewBlog, setViewBlog] = useState(null);
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);

  const handleCreate = () => {
    setEditBlog(null);
    setIsPopupOpen(true);
  };

  // Open popup for editing an existing blog
  const handleEdit = (blog) => {
    setEditBlog(blog);
    setIsPopupOpen(true);
  };

  const handleView = (blog) => {
    setViewBlog(blog);
    setIsDetailPopupOpen(true);
  };

  const reset = () => {
    setEditBlog(null);
    setViewBlog(null)
  };

  const fetchBlogs = async () => {
    const res = await fetch("http://localhost:5000/api");
    const blogs = await res.json();

    setBlogs(blogs?.data);
  };

  const createBlog = async (blogData) => {
    const response = await fetch("http://localhost:5000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    });

    if (response.ok) {
      const result = await response.json();
      toast("Blog is created");

      await fetchBlogs();
    } else {
      console.error("Failed to create blog:", response.status);
    }
  };

  const updateBlog = async (blogData, id) => {
    const response = await fetch(`http://localhost:5000/api/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    });

    if (response.ok) {
      const result = await response.json();
      toast("Blog is Updated");

      await fetchBlogs();
    } else {
      console.error("Failed to create blog:", response.status);
    }
  };

  const deleteBlog = async (id) => {
    const response = await fetch(`http://localhost:5000/api/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const result = await response.json();
      toast("Blog is deleted");

      await fetchBlogs();
    } else {
      console.error("Failed to create blog:", response.status);
    }
  };

  const handleSubmit = async (blogData, id = null) => {
    if (editBlog) {
      await updateBlog(blogData, id);
    } else {
      await createBlog(blogData);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return {
    blogs,
    isPopupOpen,
    editBlog,
    setIsPopupOpen,
    setEditBlog,
    handleSubmit,
    handleCreate,
    handleEdit,
    isDetailPopupOpen,
    setIsDetailPopupOpen,
    viewBlog,
    handleView,
    deleteBlog,
    reset,
  };
}

export default useBlog;
