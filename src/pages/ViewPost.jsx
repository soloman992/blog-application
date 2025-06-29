import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ViewPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`http://blog-backend-t8ey.onrender.com/api/posts/${id}`);
                if (!res.data || res.data === null) { // Add this check
                    setError('Post not found');
                } else {
                    setPost(res.data);
                }
            } catch (err) {
                setError('Post not found');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!post) return <p>No post data available.</p>; // Extra safety

    return (
        <div className="single-post">
            <h1>{post.title}</h1>
            <p>By {post.author?.username || 'Unknown'} on {new Date(post.createdAt).toLocaleDateString()}</p>
            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
    );
}

export default ViewPost;