import React, { useEffect, useState } from "react";
import ScrollReveal from "./Scrollreveal";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [expandedBlog, setExpandedBlog] = useState(null); // Track which blog is expanded

  useEffect(() => {
    const fetchBlogs = async () => {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      try {
        const response = await fetch(`${apiUrl}/blogs/`);
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          console.error("Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };

    fetchBlogs(); // Fetch blogs on component mount
  }, []);

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric" };
    const blogDate = new Date(date);
    return blogDate.toLocaleDateString("en-US", options); // "November 8"
  };

  const handleReadMore = (blogId) => {
    setExpandedBlog(expandedBlog === blogId ? null : blogId); //
  };

  return (
    <div className="bg-black py-24 sm:py-32 min-h-screen shadow-xl shadow-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#fbfbfb] sm:text-4xl">
            From the Blog
          </h2>
          <p className="mt-2 text-lg text-gray-300">
            Explore the Adventures of Roamlies
          </p>
        </div>

        {/* Blog Posts */}
        <div className="mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-2 gap-x-20 lg:gap-y-24 ">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <ScrollReveal delay={0.5} y={80}>
                <div
                  key={blog._id}
                  className="flex flex-col bg-black border-2  p-8 shadow-md rounded-xl"
                >
                  <div className="overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={`http://localhost:5000/uploads/${blog.image}`}
                      alt="Article cover"
                      className="object-cover object-center w-full h-72 hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="mt-10">
                    <h3 className="md:text-3xl text-2xl font-bold tracking-tight text-white hover:scale-105 transition-all duration-300">
                      {blog.title}
                    </h3>
                    <p
                      className={`mt-3 md:text-lg text-md text-gray-200 font-sans 
                      ${expandedBlog === blog._id ? "" : "line-clamp-6"}`}
                    >
                      {blog.content}
                    </p>
                    <button
                      className="text-blue-500 mt-2"
                      onClick={() => handleReadMore(blog._id)}
                    >
                      {expandedBlog === blog._id ? "Read Less" : "Read More"}
                    </button>
                    <div className="mt-6 flex items-center">
                      <div className="ml-2">
                        <h4 className="text-lg font-bold text-gray-100">
                          {blog.author.username}
                        </h4>
                        <p className="text-gray-300">
                          {/* Display the formatted date */}
                          {formatDate(blog.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))
          ) : (
            <div className="text-center">
              <p className="text-center text-gray-500">
                No blog posts available. Create one!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
