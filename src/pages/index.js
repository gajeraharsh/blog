import Layout from "@/components/Layout";
import BlogCard from "../components/BlogCard";
import BlogPopup from "../components/BlogPopup";
import useBlog from "@/hooks/useBlog";
import BlogDetailPopup from "@/components/BlogDetailPopup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/Loader";

export default function Home(props) {
  const {
    blogs,
    handleCreate,
    handleEdit,
    handleSubmit,
    isPopupOpen,
    editBlog,
    setIsPopupOpen,
    handleView,
    isDetailPopupOpen,
    setIsDetailPopupOpen,
    viewBlog,
    deleteBlog,
    reset,
    loading,
  } = useBlog();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Latest Blogs</h1>

        <div className="flex justify-end mb-4">
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create New Blog
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} onClick={() => handleView(blog)}>
              <BlogCard
                blog={blog}
                handleEdit={handleEdit}
                deleteBlog={deleteBlog}
              />
            </div>
          ))}
        </div>

        {isPopupOpen && (
          <BlogPopup
            isOpen={isPopupOpen}
            onClose={() => {
              setIsPopupOpen(false);
              reset();
            }}
            onSubmit={handleSubmit}
            initialData={editBlog}
            reset={reset}
          />
        )}
        <BlogDetailPopup
          isOpen={isDetailPopupOpen}
          onClose={() => setIsDetailPopupOpen(false)}
          blogData={viewBlog}
        />
      </div>

      <ToastContainer />
      {loading && (
        <div className="absolute top-0 w-[100%] h-[100%] flex justify-center items-center">
          <Loader />
        </div>
      )}
    </Layout>
  );
}
