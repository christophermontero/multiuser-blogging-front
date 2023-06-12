import { singleCategory } from '../../actions/category';
import Layout from '../../components/Layout';
import Card from '../../components/blog/Card';

const Category = ({ category, blogs }) => {
  return (
    <>
      <Layout>
        <main>
          <div className="container-fluid text-center">
            <header>
              <div className="col-md-12 pt-3 pb-5">
                <h1 className="display-4 fw-bold">{category.name}</h1>
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

Category.getInitialProps = ({ query }) => {
  return singleCategory(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    }
    return { category: data.category, blogs: data.blogs };
  });
};

export default Category;
