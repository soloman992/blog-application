import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard"; // adjust path as needed

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "https://blog-backend-t8ey.onrender.com/api/posts"
        );
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>All Blog Posts</h2>
      {posts.length === 0 && (
        <p style={{ textAlign: "center" }}>No posts available</p>
      )}

      <div
        style={{
          padding: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "25px",
          justifyContent: "center",
        }}
      >
        {posts.map((post) => (
          <PostCard key={post._id} post={post} showReadMore={true} />
        ))}
      </div>
    </div>
  );
}

export default Home;
