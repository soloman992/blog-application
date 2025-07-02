import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function Profile() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchMyPosts = async () => {
      const token = localStorage.getItem('token');
      if (!token) return alert('Login first!');

      try {
        const res = await axios.get('https://blog-backend-t8ey.onrender.com/api/posts/mine', {  // update to your live backend url
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(res.data);
        if (res.data.length > 0) {
          setUsername(res.data[0].author.username);
        }
      } catch (err) {
        console.error(err);
        alert('Failed to load your posts');
      }
    };

    fetchMyPosts();
  }, []);

  // 👉 Delete Post Handler
  const handleDelete = async (postId) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Login first!');

    try {
      await axios.delete(`https://blog-backend-t8ey.onrender.com/api/posts/${postId}`, { // update to your live backend url
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(posts.filter(post => post._id !== postId)); // Remove from UI
    } catch (err) {
      console.error(err);
      alert('Failed to delete post');
    }
  };

  return (
    <div className="container">
      <h2>{username ? `${username}'s Profile` : 'Your Blog Posts'}</h2>
      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        posts.map(post => (
          <div className="blog-post" key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => handleDelete(post._id)}>Delete</button> {/* 🔥 Add Delete Button */}
            <NavLink to={`/posts/${post._id}/edit`}>Edit</NavLink>
          </div>
        ))
      )}
    </div>
  );
}

export default Profile;