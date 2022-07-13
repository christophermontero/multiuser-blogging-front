import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Editor from './Editor';

const CreateBlog = ({ router }) => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <div className="my-2">
      {JSON.stringify(router)}
      <Editor
        name="description"
        onChange={(data) => {
          setData(data);
        }}
        editorLoaded={editorLoaded}
      />
    </div>
  );
};

export default withRouter(CreateBlog);
