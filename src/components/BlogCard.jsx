import { useState } from "react";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";
import Comment from "./Comment";

const BlogCard = ({
  blog,
  expandedBlog,
  handleLike,
  handleReadMore,
  formatDate,
}) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(blog.likes?.length || 0);

  return (
    <div className="flex flex-col bg-black border-2 p-8 shadow-md rounded-xl">
      <div className="overflow-hidden rounded-lg shadow-lg">
        <img
          src={`https://roamly-server.onrender.com/uploads/${blog.image}`}
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

        {/* Like + Comment Buttons */}
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => handleLike(blog._id, setLikes, setLiked)}
            className="flex items-center gap-1 text-blue-400"
          >
            {liked ? <FaHeart /> : <FaRegHeart />} {likes}
          </button>

          <div className="flex items-center gap-1 text-gray-400">
            <FaRegComment />
            <span>{blog.comments?.length || 0}</span>
          </div>
        </div>

        {/* Comment Component */}
        <Comment blogId={blog._id} />

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
            <p className="text-gray-300">{formatDate(blog.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
