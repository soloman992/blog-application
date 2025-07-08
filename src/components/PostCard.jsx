// components/PostCard.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import defaultImage from "../assets/default.jpg";

function stripHtmlTags(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || div.innerText || "").replace(/\n+/g, " ").trim();
}

function PostCard({ post, onDelete, onEdit, onView, showActions = false, showReadMore = true }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
      whileTap={{ scale: 1.01 }}
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        width: "300px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <h3>
        <strong>{post.title}</strong>
      </h3>
      <img
        src={post.imageUrl || defaultImage}
        alt={post.title}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultImage;
        }}
        style={{
          width: "250px",
          height: "250px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />
      <p>{stripHtmlTags(post.content).substring(0, 100)}...</p>
      <p>
        <strong>Author:</strong> {post.author?.username || "Unknown"}
      </p>
      {showReadMore && (
        <Link
          to={`/posts/${post._id}`}
          style={{
            color: "#007bff",
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          Read More
        </Link>
      )}

      {showActions && (
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <button
            onClick={() => onView(post._id)}
            className="btn btn-outline-primary m-1"
          >
            View
          </button>
          <button
            onClick={() => onEdit(post._id)}
            className="btn btn-outline-warning m-1"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(post._id)}
            className="btn btn-outline-danger m-1"
          >
            Delete
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default PostCard;
