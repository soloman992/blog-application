import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ViewPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`https://blog-backend-t8ey.onrender.com/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!post) return <p>Loading…</p>;

  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p>by {post.author?.username}</p>
      {/* If you store HTML content: */}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}

export default ViewPost;