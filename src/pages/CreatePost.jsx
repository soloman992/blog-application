import React, { useState } from 'react';
import axios from 'axios';
import RichEditor from '../components/RichEditor';
import UploadIMG from '../components/UploadIMG';

function CreatePost({ token }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            alert('Post content cannot be empty!');
            return;
        }

        try {
            await axios.post('https://blog-backend-t8ey.onrender.com/api/posts', {
                title,
                content,
                imageUrl
            }, { headers: { Authorization: `Bearer ${token}` } });

            setMessage('Post created successfully!');
            setTitle('');
            setContent('');
        } catch (err) {
            console.error('Full Error:', err.response || err);
            setMessage('Error creating post');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Create New Post</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '90%' }}>
                <input
                    type="text"
                    placeholder="Post Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ padding: '10px' }}
                />
                <RichEditor value={content} onChange={setContent} />

                <UploadIMG setImageUrl={setImageUrl} />

                <button
                    type="submit"
                    style={{
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Create Post
                </button>
            </form>
        </div>
    );
}

export default CreatePost;