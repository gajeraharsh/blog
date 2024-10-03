import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function useBlog() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [viewBlog, setViewBlog] = useState(null);
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    setEditBlog(null);
    setIsPopupOpen(true);
  };

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
    setViewBlog(null);
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://blog-backend-drak.onrender.com/api");
      const blogs = await res.json();
      setLoading(false);

      setBlogs(blogs?.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const createBlog = async (blogData) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://blog-backend-drak.onrender.com/api",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blogData),
        }
      );

      if (response.ok) {
        setLoading(false);
        const result = await response.json();
        toast("Blog is created");

        await fetchBlogs();
      } else {
        console.error("Failed to create blog:", response.status);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const updateBlog = async (blogData, id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://blog-backend-drak.onrender.com/api/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blogData),
        }
      );

      if (response.ok) {
        setLoading(false);
        const result = await response.json();
        toast("Blog is Updated");

        await fetchBlogs();
      } else {
        console.error("Failed to create blog:", response.status);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://blog-backend-drak.onrender.com/api/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setLoading(false);
        const result = await response.json();
        toast("Blog is deleted");

        await fetchBlogs();
      } else {
        console.error("Failed to create blog:", response.status);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
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
    loading
  };
}

export default useBlog;
