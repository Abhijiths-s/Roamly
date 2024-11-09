import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BlogProfilePage = ({ showAlert }) => {
  const [blogs, setBlogs] = useState([]);
  const [activePostId, setActivePostId] = useState(null);
  const [user, setUser] = useState(null);

  // Fetch blogs created by the logged-in user
  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage or any storage method you use
        const userResponse = await fetch("http://localhost:5000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData); // Set user details
        } else {
          const errorData = await userResponse.json();
          console.error("Error fetching user details:", errorData.message);
        }

        const response = await fetch("http://localhost:5000/api/blogs/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          const errorData = await response.json();
          console.error("Error fetching blogs:", errorData.message);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchUserBlogs();
  }, []);

  // Handle delete blog
  const handleDeleteBlog = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
        console.log(`Deleted blog post with ID: ${id}`);
        showAlert("Post deleted successfully!", "success");
      } else {
        const errorData = await response.json();
        console.error("Error deleting blog:", errorData.message);
        showAlert("Post is not deleted!", "error");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleMenuToggle = (id) => {
    setActivePostId(activePostId === id ? null : id);
  };

  return (
    <div className="bg-cyan-300 flex flex-col justify-center items-center -z-10">
      <Link to="/dashboard">
        <button className=" absolute top-4 left-4 bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition duration-300">
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

      {user && (
        <div className="flex items-center justify-center space-x-4  mt-10 mb-4 bg-cyan-200 rounded-lg shadow-md p-8 max-w-7xl mx-auto">
          {/* <img
              src={user.profilePicture || "/default-avatar.jpg"} // Fallback to a default avatar if not available
              alt={user.username}
              className="w-16 h-16 rounded-full"
            /> */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-3">
              {user.username}
            </h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 shadow-md bg-cyan-200 py-10 mb-6">
        <div className="flex flex-col items-center justify-center mb-6 ">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            My Blog Posts
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-2 gap-x-20 lg:gap-y-24  ">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center relative "
              >
                <div className="my-10">
                  {blog.image && (
                    <img
                      src={`http://localhost:5000/uploads/${blog.image}`} // Assuming the blog's image URL is stored in the 'image' field
                      alt={blog.title}
                      className="w-full  object-cover rounded-md mb-4"
                    />
                  )}
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    {blog.title}
                  </h4>
                  <p className="text-gray-600 mb-2">{blog.content}</p>
                  <p className="text-gray-900 text-sm">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="absolute top-2 right-2">
                  <button
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => handleMenuToggle(blog._id)}
                  >
                    <svg
                      className="w-6 h-6 text-gray-800 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="4"
                        d="M12 6h.01M12 12h.01M12 18h.01"
                      />
                    </svg>
                  </button>
                  {activePostId === blog._id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                      <Link to={`/edit/${blog._id}`} state={{ blogs }}>
                        <button
                          className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full"
                          // onClick={() =>
                          //   handleUpdateBlog(blog._id, { title: "Updated Title" })
                          // }
                        >
                          <svg
                            className="w-6 h-6 mr-4 text-gray-800 "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                            />
                          </svg>
                          <span>Update</span>
                        </button>
                      </Link>
                      <button
                        className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full"
                        onClick={() => handleDeleteBlog(blog._id)}
                      >
                        <svg
                          className="w-6 h-6 mr-4 text-gray-800 "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                          />
                        </svg>
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No blog posts available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogProfilePage;
