import React, { useState } from 'react';
import axios from 'axios';

function CreatePost({ token }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('https://blog-backend-t8ey.onrender.com/api/posts',
                { title, content },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage('Post created successfully!');
            setTitle('');
            setContent('');
        } catch (err) {
            console.error(err);
            setMessage('Error creating post');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Create New Post</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
                <input
                    type="text"
                    placeholder="Post Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ padding: '10px' }}
                />
                <textarea
                    placeholder="Post Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    style={{ padding: '10px', minHeight: '150px' }}
                />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Create Post
                </button>
            </form>
        </div>
    );
}

export default CreatePost;