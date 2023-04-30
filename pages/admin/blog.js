import dynamic from 'next/dynamic';
import Admin from '../../components/auth/Admin';
import Layout from '../../components/Layout';
const CreateBlog = dynamic(() => import('../../components/blogs/CreateBlog'), {
  ssr: false
});

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-3 pb-3">
              <h2>Create new blog</h2>
            </div>
            <div className="col-md-12">
              <CreateBlog />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blog;
