import Admin from '../../components/auth/Admin';
import CreateBlog from '../../components/CreateBlog';
import Layout from '../../components/Layout';

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-3 pb-3">
              <h2>Create a new Blog</h2>
            </div>
            <div className="col-md-6">
              <CreateBlog />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blog;
