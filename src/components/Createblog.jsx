import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function CreateBlog({ onSubmit ,showAlert}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(""); // State for author
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate=useNavigate();

  useEffect(() => {
    // Get the username from local storage or global state
    const loggedInUser = localStorage.getItem("username"); // Assuming username is stored in local storage
    if (loggedInUser) {
      setAuthor(loggedInUser); // Set the author to the logged-in user's username
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFileName(file.name);
      setImage(file);
    } else {
      alert("Please upload a valid image file.");
      setFileName("");
      setImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL || "https://roamly-server.onrender.com/api";
    if (title && content && author && image) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("author", author);
      formData.append("image", image);

      try {
        const token = localStorage.getItem("token"); // Ensure the token is correctly stored
        const response = await fetch(`${apiUrl}/blogs/create`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
          },
        });

        console.log("Server response:", response);
        if (response.ok) {
          onSubmit();
          setRedirect(true); 
          // Set redirect state to true
          setTitle("");
          setContent("");
          setImage("");
          setFileName("");
          showAlert("Post Created successfully!", "success");
          navigate("/dashboard");
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || "Failed to create blog post");
          console.error("Failed to create blog post");
        }
      } catch (error) {
        setErrorMessage("Error creating blog post");
        console.error("Error creating blog post", error);
      }
    }
  };

  // if (redirect) {
  //   return <Navigate to="/dashboard" />;
  // }

  return (
    <div className="flex w-screen h-screen relative items-center justify-center bg-black">
     
    
      <Link to="/dashboard">
        <button className=" absolute top-4 left-4 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition duration-300">
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Link>
      <div className="bg-black border-2 p-6 rounded-xl shadow-md md:w-1/2 w-full z-10 mx-5 md:mx-0">
        <h2 className="text-4xl text-center font-semibold text-gray-200 mb-8">
          Create a New Blog Post
        </h2>
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />

          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <label htmlFor="Author" className="text-gray-100 text-lg -mb-5 ml-2">
            Author</label>
          <input
            type="text"
            id="Author"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)} // This line can be omitted if author is set automatically
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
            readOnly // Make this read-only if you don't want users to change it
          />

          <div className="flex items-center gap-4">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleImageUpload}
            />

            <label
              htmlFor="file-upload"
              className="bg-yellow-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-yellow-700 transition duration-300"
            >
              Choose File
            </label>

            {fileName && (
              <span className="text-gray-700 text-sm">{fileName}</span>
            )}
          </div>

          <button
            type="submit"
            className={`bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition duration-300 ${
              !(title && content && author)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={!(title && content && author)}
          >
            Post Blog
          </button>
        </form>
      </div>
    </div>
  );
}
