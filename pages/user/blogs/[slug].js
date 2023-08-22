import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
import UpdateBlog from '../../../components/blogs/UpdateBlog';

const Blog = () => {
  return (
    <Layout>
      <Private>
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
      </Private>
    </Layout>
  );
};

export default Blog;
