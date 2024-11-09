import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditBlog({ blogs, setBlogs ,showAlert}) {
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
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
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
        setContent("")// Redirect to dashboard after update
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
    <div className="container flex flex-col justify-center  ">
      <h2 className="text-3xl font-bold mb-4">Edit Blog Post</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateBlog();
        }}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
          className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
          placeholder="Content"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition duration-300 mt-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
