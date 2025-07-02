import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import UploadIMG from '../components/UploadIMG';

DocumentEditorContainerComponent.Inject(Toolbar);

function EditPost() {
    const { id } = useParams();
    const nav = useNavigate();
    const editorRef = useRef(null);

    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [originalContent, setOriginalContent] = useState('');

    useEffect(() => {
        axios.get(`https://blog-backend-t8ey.onrender.com/api/posts/${id}`)
            .then(res => {
                setTitle(res.data.title);
                setImageUrl(res.data.imageUrl);
                setOriginalContent(res.data.content);
            })
            .catch(err => console.error(err));
    }, [id]);

    // Load the document into the editor after it is rendered
    useEffect(() => {
        if (editorRef.current && originalContent) {
            editorRef.current.documentEditor.open(originalContent);
        }
    }, [originalContent]);

    const handleSave = async (e) => {
        e.preventDefault();

        // Serialize the updated content
        const updatedContent = editorRef.current.documentEditor.serialize();

        try {
            await axios.put(`https://blog-backend-t8ey.onrender.com/api/posts/${id}`,
                { title, content: updatedContent, imageUrl },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
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
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Post Title"
                    style={{ padding: '10px' }}
                />

                {/* Document Editor */}
                <DocumentEditorContainerComponent
                    id="edit-container"
                    ref={editorRef}
                    height={'590px'}
                    serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
                    enableToolbar={true}
                />

                <UploadIMG setImageUrl={setImageUrl} />

                <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Save
                </button>
            </form>
        </div>
    );
}

export default EditPost;