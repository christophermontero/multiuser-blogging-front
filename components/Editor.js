import React, { useEffect, useRef } from 'react';

function Editor({ onChange, editorLoaded, value }) {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const editorConfig = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'fontSize',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'alignment',
      'outdent',
      'indent',
      'bulletedList',
      'numberedList',
      'blockQuote',
      '|',
      'link',
      'insertTable',
      'mediaEmbed',
      '|',
      'undo',
      'redo'
    ],
    placeholder: 'Click to start typing'
  };

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    };
  }, []);

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          editor={ClassicEditor}
          config={editorConfig}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}

export default Editor;
