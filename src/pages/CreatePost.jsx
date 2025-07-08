import React, { useState } from "react";
import axios from "axios";
import RichEditor from "../components/RichEditor";
import UploadIMG from "../components/UploadIMG";

function CreatePost({ token }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("Post content cannot be empty!");
      return;
    }

    try {
      await axios.post(
        "https://blog-backend-t8ey.onrender.com/api/posts",
        { title, content, imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Post created successfully!");
      setTitle("");
      setContent("");
      setImageUrl("");
      console.log(imageUrl);
    } catch (err) {
      console.error("Full Error:", err.response || err);
      setMessage("Error creating post: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create New Post</h2>
      {message && <p>{message}</p>}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "90%",
        }}
      >
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: "10px" }}
        />
        
        <RichEditor value={content} onChange={setContent} />

        <UploadIMG 
          setImageUrl={setImageUrl} 
          token={token}
          setLoading={setImageLoading}
          setError={setImageError}
        />

        {imageLoading ? (
          <p>Uploading image...</p>
        ) : imageError ? (
          <p style={{ color: 'red' }}>Error: {imageError}</p>
        ) : imageUrl ? (
          <div>
            <p>Image Preview:</p>
            <img
              src={imageUrl}
              alt="Preview"
              style={{ maxWidth: "200px", marginBottom: "10px" }}
              onError={() => setImageError("Failed to load image preview")}
            />
          </div>
        ) : null}

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;