import { useRef, useEffect } from 'react';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';

DocumentEditorContainerComponent.Inject(Toolbar);

function RichEditor({ onContentChange }) {
    const editorRef = useRef(null);

    // Listen for document changes and pass content to parent
    const handleDocumentChange = () => {
        const content = editorRef.current?.documentEditor?.serialize();
        onContentChange(content);
    };

    return (
        <DocumentEditorContainerComponent
            id="container"
            ref={editorRef}
            height={'590px'}
            serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
            enableToolbar={true}
            documentChange={handleDocumentChange} // Listen to document changes
        />
    );
}

export default RichEditor;