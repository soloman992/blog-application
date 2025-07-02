import axios from 'axios';
import { useState } from 'react';

function UploadIMG({ setImageUrl }) {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        if (!file) return alert('Please select an image first.');

        const formData = new FormData();
        formData.append('image', file);

        try {
            setUploading(true);
            const res = await axios.post('https://blog-backend-t8ey.onrender.com/api/upload', formData);

            const imageUrl = res.data.imageUrl || res.data.url;

            console.log('Uploaded image URL:', imageUrl);

            setImageUrl(imageUrl);
            alert('Image uploaded successfully');

            setFile(null);
        } catch (err) {
            console.error(err);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input 
                type="file" 
                accept="image/*" 
                onChange={e => setFile(e.target.files[0])} 
            />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
        </div>
    );
}

export default UploadIMG;