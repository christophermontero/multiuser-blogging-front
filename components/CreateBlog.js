import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Editor from './Editor';

const CreateBlog = ({ router }) => {
  const blogLocalStore = () => {
    if (typeof window !== 'undefined' && localStorage.getItem('blog')) {
      return JSON.parse(localStorage.getItem('blog'));
    } else {
      return false;
    }
  };
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [body, setBody] = useState(blogLocalStore());
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

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, [router]);

  const handleChange = (name) => (e) => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.append(name, value);
    setValues({
      ...values,
      [name]: value,
      formData,
      error: ''
    });
  };

  const handleBody = (data) => {
    formData.append('body', data);
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(data));
    }
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
