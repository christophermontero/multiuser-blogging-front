import { singleTag } from '../../actions/tag';
import Layout from '../../components/Layout';
import Card from '../../components/blog/Card';

const Tag = ({ tag, blogs }) => {
  return (
    <>
      <Layout>
        <main>
          <div className="container-fluid text-center">
            <header>
              <div className="col-md-12 pt-3 pb-5">
                <h1 className="display-4 fw-bold">{tag.name}</h1>
                {blogs.map((blog, index) => (
                  <div>
                    <Card key={index} blog={blog} />
                    <hr />
                  </div>
                ))}
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </>
  );
};

Tag.getInitialProps = ({ query }) => {
  return singleTag(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    }
    return { tag: data.tag, blogs: data.blogs };
  });
};

export default Tag;
