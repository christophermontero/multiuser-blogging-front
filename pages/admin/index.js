import Link from 'next/link';
import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-3 pb-3">
              <h2>Admin Dashboard</h2>
            </div>
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/category-tag">Create categories</Link>
                </li>
                <li className="list-group-item">
                  <Link href="/admin/category-tag">Create tags</Link>
                </li>
                <li className="list-group-item">
                  <Link href="/admin/blog">Create blog</Link>
                </li>
                <li className="list-group-item">
                  <Link href="/admin/blogs">Update/Delete blog</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-8">Right</div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
