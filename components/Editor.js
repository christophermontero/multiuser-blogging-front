import React, { useEffect, useRef } from 'react';

function Editor({ onChange, editorLoaded, value }) {
  const editorRef = useRef();
  const { CKEditor, CustomEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      CustomEditor: require('../ckeditor5-custom-build/build/ckeditor')
    };
  }, []);

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          editor={CustomEditor}
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
