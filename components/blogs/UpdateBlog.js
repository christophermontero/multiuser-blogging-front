import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { singleBlog } from '../../actions/blog';
import Editor from '../Editor';

const UpdateBlog = ({ router }) => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [body, setBody] = useState('');
  const [values, setValues] = useState({
    error: '',
    success: '',
    formData: '',
    title: ''
  });

  const { formData, title } = values;

  const handleBody = (e) => {
    setBody(e);
    formData.set('body', e);
  };

  const editBlog = (e) => {
    console.log('update blog');
  };

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

  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
        <div className="form-group mb-2">
          <label className="text-muted">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleChange('title')}
          />
        </div>
        <div className="form-group mb-2 ckeditor">
          <Editor
            value={body}
            onChange={handleBody}
            editorLoaded={editorLoaded}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    );
  };

  const initBlog = () => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
        }
      });
    }
  };

  useEffect(() => {
    setEditorLoaded(true);
    setValues({ ...values, formData: new FormData() });
    initBlog();
  }, []);

  return (
    <div className="container-fluid pb-2">
      <div className="row">
        <div className="col-md-8">
          {updateBlogForm()}
          <div className="pt-3">
            <p>Show success and error msg</p>
          </div>
        </div>
        <div className="col-md-4">
          <div>
            <div className="form-group pb-2">
              <h5>Featured image</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(UpdateBlog);
