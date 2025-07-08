import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ViewPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://blog-backend-t8ey.onrender.com/api/posts/${id}`)
            .then(res => {
                if (res.data && res.data._id) {
                    setPost(res.data);
                } else {
                    setError('Post not found');
                }
            })
            .catch(err => {
                console.error(err);
                setError('Error loading post');
            });
    }, [id]);

    if (error) return <p>{error}</p>;
    if (!post) return <p>Loading…</p>;
    console.log(post.imageUrl);


    return (
        <div className="container">
            <h1>{post.title}</h1>

            {post.imageUrl && (
                <img src={post.imageUrl} alt="Post" style={{ maxWidth: '100%', margin: '20px 0' }} />
            )}

            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            <p>by {post.author?.username}</p>
        </div>
    );
}

export default ViewPost;