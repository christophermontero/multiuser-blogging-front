import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import Layout from '../../components/Layout';
import Card from '../../components/blog/Card';
import { APP_NAME, DOMAIN } from '../../config';

const Blogs = ({ blogs, categories, tags, size, router }) => {
  const head = () => (
    <Head>
      <title>Programming blogs and tutorials | {APP_NAME}</title>
      <meta
        name="description"
        content="Programming blogs and tutorials for software developers"
      />
      <link rel="canonical" href={`${DOMAIN}/blogs`} />
    </Head>
  );
  const showAllBlogs = () =>
    blogs.map((blog, i) => (
      <article key={i}>
        <Card blog={blog} />
        <hr />
      </article>
    ));

  const showAllCategories = () =>
    categories.map((category, i) => (
      <Link key={i} href={`/categories/${category.slug}`}>
        <a className="btn btn-primary mx-1 mt-3">{category.name}</a>
      </Link>
    ));

  const showAllTags = () =>
    tags.map((tag, i) => (
      <Link key={i} href={`/tags/${tag.slug}`}>
        <a className="btn btn-outline-info mx-1 mt-3">{tag.name}</a>
      </Link>
    ));

  return (
    <>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold text-center">
                  Programming blogs and tutorials
                </h1>
              </div>
              <section>
                <div className="pb-2 text-center">
                  {showAllCategories()}
                  <br />
                  {showAllTags()}
                </div>
              </section>
            </header>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">{showAllBlogs()}</div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

Blogs.getInitialProps = () => {
  return listBlogsWithCategoriesAndTags().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        size: data.size
      };
    }
  });
};

export default withRouter(Blogs);
