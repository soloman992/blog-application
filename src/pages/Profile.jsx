import { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      const token = localStorage.getItem('token');
      if (!token) return alert('Login first!');

      try {
        const res = await axios.get('https://blog-backend-t8ey.onrender.com/api/posts/mine', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setPosts(res.data);

        if (res.data.length > 0 && res.data[0].author?.username) {
          setUsername(res.data[0].author.username);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        alert('Failed to load your posts');
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <p>Loading your posts...</p>
      ) : (
        <>
          <h2>{username ? `${username}'s Profile` : 'Your Blog Posts'}</h2>
          {posts.length === 0 ? (
            <p>No posts yet</p>
          ) : (
            posts.map(post => (
              <div className="blog-post" key={post._id} style={{ marginBottom: '20px' }}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

export default Profile;