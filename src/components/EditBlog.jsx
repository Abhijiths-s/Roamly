import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditBlog({ blogs, setBlogs, showAlert }) {
  const { id } = useParams(); // Get blog ID from URL
  const navigate = useNavigate(); // For redirecting after edit
  const blogToEdit = blogs.find((blog) => blog._id === id);

  const [title, setTitle] = useState(blogToEdit?.title || "");
  const [content, setContent] = useState(blogToEdit?.content || "");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!blogToEdit) {
      setErrorMessage("Blog not found");
    }
  }, [blogToEdit]);

  const handleUpdateBlog = async () => {
    const updatedData = { title, content };
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) => (blog._id === id ? updatedBlog : blog))
        );
        console.log(`Updated blog post with ID: ${id}`);
        showAlert("Post updated successfully!", "success");
        setTitle("");
        setContent(""); // Redirect to dashboard after update
        navigate("/profile");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error updating blog");
        console.error("Error updating blog:", errorData.message);
      }
    } catch (error) {
      setErrorMessage("Error updating blog");
      console.error("Error updating blog:", error);
    }
  };

  //   if (errorMessage) {
  //     return (
  //       <div className="edit-blog-container">
  //         <h2 className="text-3xl font-bold mb-4">Edit Blog Post</h2>
  //         <p className="text-red-500">{errorMessage}</p>
  //       </div>
  //     );
  //   }

  return (
    <div className="flex flex-col justify-center items-center border-2 border-black min-h-screen bg-black">
      <div className="shadow-md shadow-orange-300 rounded-lg border-2 border-red-100 py-9 px-10 w-full max-w-md lg:max-w-4xl bg-white">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-orange-500 text-center">
            Edit Blog Post
          </h2>
        </div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateBlog();
            }}
            className="flex flex-col gap-8 items-center"
          >
            
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 rounded-md border border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 w-full"
              placeholder="Title"
              required
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="8"
              className="p-3 rounded-md border border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 w-full"
              placeholder="Content"
              required
            />
            <button
              type="submit"
              className="bg-transparent border-green-500 border-2 text-black py-2 px-4 rounded-md hover:bg-green-500 hover:text-white  transition duration-300 font-semibold font-mono md:w-1/2 w-full mt-8"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="bg-transparent border-red-700 border-2 text-black py-2 px-4 rounded-md hover:bg-red-700 transition duration-300 mt-2 font-semibold hover:text-white font-mono md:w-1/2 w-full"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
