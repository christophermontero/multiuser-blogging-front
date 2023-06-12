import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { useState } from 'react';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import Layout from '../../components/Layout';
import Card from '../../components/blog/Card';
import { APP_NAME, DOMAIN } from '../../config';

const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogsLimit,
  blogSkip,
  blogLoadedLength
}) => {
  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(blogSkip);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);
  const [loadedBlogsLength, setLoadedBlogsLength] = useState(blogLoadedLength);

  const loadMore = () => {
    let toSkip = skip + limit;
    listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(error);
      } else {
        setLoadedBlogs((prevBlogs) => [...prevBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
        setLoadedBlogsLength(
          (prevBlogsLength) => prevBlogsLength + data.blogs.length
        );
      }
    });
  };

  const loadMoreButton = () =>
    size > 0 &&
    loadedBlogsLength < size && (
      <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
        Load more
      </button>
    );

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

  const showAllLoadedBlogs = () => {
    return loadedBlogs.map((blog, i) => (
      <article key={i}>
        <Card blog={blog} />
        <hr />
      </article>
    ));
  };

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
          <div className="container-fluid">{showAllBlogs()}</div>
          <div className="container-fluid">{showAllLoadedBlogs()}</div>
          <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
        </main>
      </Layout>
    </>
  );
};

Blogs.getInitialProps = () => {
  let skip = 0,
    limit = 2;

  return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogSkip: skip,
        blogLoadedLength: data.blogs.length
      };
    }
  });
};

export default withRouter(Blogs);
