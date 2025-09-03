import { useState, useEffect } from "react";
import axios from "axios";

const Comment = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/blogs/${blogId}/comments`)
      .then((response) => setComments(response.data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [blogId]);

  const handleComment = async () => {
    if (!text.trim()) return; // Prevent empty comments
    try {
      const res = await axios.post(
        `http://localhost:5000/api/blogs/${blogId}/comment`,
        { text },
        { 
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    }
      );
      setComments(res.data);
      setText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      <div className="space-y-4 max-h-60 overflow-y-auto">
        {comments.length === 0 ? (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((c,i) => (
            <div key={i} className="bg-gray-800 p-3 rounded-lg">
              <p className="text-sm">
                <span className="font-semibold">
                  {c.user?.username || "Anonymous"}:
                </span>{" "}
                {c.text}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Comment Input */}
      <div className="flex items-center mt-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="border flex-1 p-2 rounded"
        />
        <button
          onClick={handleComment}
          className="ml-2 px-3 py-1 bg-green-500 text-white rounded"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Comment;
