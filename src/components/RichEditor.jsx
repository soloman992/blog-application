import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

function RichEditor({ value, onChange }) {
    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            style={{ minHeight: '150px', marginBottom: '20px' }}
        />
    );
}

export default RichEditor;