import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('https://blog-backend-t8ey.onrender.com/api/posts');
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className='container'>
      <h2>All Blog Posts</h2>
      {posts.length === 0 && <p>No posts available</p>}
      {posts.map(post => (
        <div key={post._id} style={{ border: '1px solid gray', margin: '10px 0', padding: '10px' }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p><strong>Author:</strong> {post.author?.username || 'Unknown'}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;