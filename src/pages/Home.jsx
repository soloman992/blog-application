import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "https://blog-backend-t8ey.onrender.com/api/posts"
      );
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  const stripHtmlTags = (html) => {
    // Replace <br> and <p> with newlines for proper spacing
    let formatted = html.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n");

    // Remove remaining HTML tags
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = formatted;

    // Return text with proper line breaks
    return (tempDiv.textContent || tempDiv.innerText || "")
      .replace(/\n+/g, " ")
      .trim();
  };

  return (
    <div className="container">
      <h2>All Blog Posts</h2>
      {posts.length === 0 && <p>No posts available</p>}
      {posts.map((post) => (
        <div
          key={post._id}
          style={{
            border: "1px solid gray",
            margin: "10px 0",
            padding: "10px",
          }}
        >
          <h3>{post.title}</h3>
          <p>{stripHtmlTags(post.content).substring(0, 100)}...</p>
          <p>
            <strong>Author:</strong> {post.author?.username || "Unknown"}
          </p>
          <Link to={`/posts/${post._id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
