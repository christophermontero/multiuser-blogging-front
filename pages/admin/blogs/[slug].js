import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import UpdateBlog from '../../../components/blogs/UpdateBlog';

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-3 pb-3">
              <h2>Update blog</h2>
            </div>
            <div className="col-md-12">
              <UpdateBlog />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blog;
