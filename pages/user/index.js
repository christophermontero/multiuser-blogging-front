import Link from 'next/link';
import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';

const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-3 pb-3">
              <h2>User Dashboard</h2>
            </div>
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/user/blog">Create blog</Link>
                </li>
                <li className="list-group-item">
                  <Link href="/user/blogs">Update/Delete blog</Link>
                </li>
                <li className="list-group-item">
                  <Link href="/user/update">Update profile</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-8">Right</div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default UserIndex;
