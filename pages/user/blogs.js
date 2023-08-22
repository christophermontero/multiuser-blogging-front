import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import ReadBlog from '../../components/blogs/ReadBlog';
import { isAuth } from '../../actions/auth';

const Blogs = () => {
  const username = isAuth() && isAuth().username;

  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-3 pb-3">
              <h2>Manage blogs</h2>
            </div>
            <div className="col-md-12">
              <ReadBlog username={username} />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default Blogs;
