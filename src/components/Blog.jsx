import React, { useEffect, useState } from "react";
import ScrollReveal from "./Scrollreveal";
import axios from "axios";
import Comment from "./Comment";
import BlogCard from "./BlogCard"; // new component

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [expandedBlog, setExpandedBlog] = useState(null); // Track which blog is expanded

  useEffect(() => {
    const fetchBlogs = async () => {
      const apiUrl =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
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

    fetchBlogs();
  }, []);

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric" };
    const blogDate = new Date(date);
    return blogDate.toLocaleDateString("en-US", options); // "November 8"
  };

  const handleLike = async (blogId, setLiked, setLikes) => {
    const res = await axios.post(
      `http://localhost:5000/api/blogs/${blogId}/like`,
      {},
      { headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }}
    );
    setLikes(res.data.likes);
    setLiked(res.data.liked);
  };

  const handleReadMore = (blogId) => {
    setExpandedBlog(expandedBlog === blogId ? null : blogId);
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
        <div className="mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-2 gap-x-20 lg:gap-y-24">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <ScrollReveal key={blog._id} delay={0.5} y={80}>
                <BlogCard
                  blog={blog}
                  expandedBlog={expandedBlog}
                  handleLike={handleLike}
                  handleReadMore={handleReadMore}
                  formatDate={formatDate}
                />
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
