import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RichEditor from '../components/RichEditor';
import UploadIMG from '../components/UploadIMG';

function EditPost() {
    const { id } = useParams();
    const nav = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [message] = useState('');

    useEffect(() => {
        axios.get(`https://blog-backend-t8ey.onrender.com/api/posts/${id}`)
            .then(res => {
                setTitle(res.data.title);
                setContent(res.data.content);
                setImageUrl(res.data.imageUrl);
            })
            .catch(err => console.error('Error fetching post:', err));
    }, [id]);

    const handleSave = async (e) => {
        e.preventDefault();

        if (!content || content.trim() === '') {
            alert('Post content cannot be empty!');
            return;
        }

        try {
            await axios.put(`https://blog-backend-t8ey.onrender.com/api/posts/${id}`,
                { title, content, imageUrl },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }
            );
            nav(`/posts/${id}`);
        } catch (err) {
            console.error(err);
            alert('Error saving post');
        }
    };

    return (
        <div className="container" style={{ padding: '20px' }}>
            <h2>Edit Post</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '90%' }}>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                    style={{ padding: '10px' }}
                />

                <RichEditor value={content} onChange={setContent} />

                <UploadIMG setImageUrl={setImageUrl} />

                <button
                    type="submit"
                    style={{
                        padding: '10px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default EditPost;