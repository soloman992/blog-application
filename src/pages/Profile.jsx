import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard"; // Adjust the path

function Profile() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyPosts = async () => {
      const token = localStorage.getItem("token");
      if (!token) return alert("Login first!");

      try {
        const res = await axios.get("https://blog-backend-t8ey.onrender.com/api/posts/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data);
        if (res.data.length > 0) {
          setUsername(res.data[0].author.username);
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load your posts");
      }
    };

    fetchMyPosts();
  }, []);

  const handleDelete = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Login first!");

    try {
      await axios.delete(`https://blog-backend-t8ey.onrender.com/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete post");
    }
  };

  const handleView = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleEdit = (postId) => {
    navigate(`/posts/${postId}/edit`);
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>
        {username ? `${username}'s Profile` : "Your Blog Posts"}
      </h2>

      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
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
          <PostCard
            key={post._id}
            post={post}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onView={handleView}
            showActions={true}
            showReadMore={false}
          />
        ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
