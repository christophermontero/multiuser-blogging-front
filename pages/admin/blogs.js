import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';
import ReadBlog from '../../components/blogs/BlogRead';

const Blogs = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-3 pb-3">
              <h2>Manage blogs</h2>
            </div>
            <div className="col-md-12">
              <ReadBlog />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blogs;
