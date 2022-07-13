import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Editor from './Editor';

const CreateBlog = ({ router }) => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [body, setBody] = useState({});
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishButton: false
  });

  const { error, sizeError, success, formData, title, hidePublishButton } =
    values;

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      title: e.target.value
    });
  };

  const handleBody = (data) => {
    setBody(data);
  };

  const publishBlog = (e) => {
    e.preventDefault();
    console.log('ready to publish');
  };

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group mb-2">
          <label className="text-muted">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleChange('title')}
          />
        </div>
        <div className="form-group mb-2">
          <Editor
            value={body}
            onChange={handleBody}
            editorLoaded={editorLoaded}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Publish
          </button>
        </div>
      </form>
    );
  };

  return <>{createBlogForm()}</>;
};

export default withRouter(CreateBlog);
