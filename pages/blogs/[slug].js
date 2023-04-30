import parse from 'html-react-parser';
import moment from 'moment';
import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { listRelatedBlogs, singleBlog } from '../../actions/blog';
import Layout from '../../components/Layout';
import SmallCard from '../../components/blog/SmallCard';
import { API, APP_NAME } from '../../config';

const SingleBlog = ({ blog, query }) => {
  const [related, setRelated] = useState([]);

  const loadRelated = () => {
    listRelatedBlogs(blog).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
  }, [blog]);

  const head = () => (
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name="description" content={blog.metaDesc} />
      <link rel="canonical" href={`${API}/blog/${query.slug}`} />
    </Head>
  );

  const showBlogCategories = (blog) =>
      blog.categories.map((category, i) => (
        <Link key={i} href={`/categories/${category.slug}`}>
          <a
            className="btn btn-primary mx-1 mt-3"
            style={{ textDecoration: 'none' }}
          >
            {category.name}
          </a>
        </Link>
      )),
    showBlogTags = (blog) =>
      blog.tags.map((tag, i) => (
        <Link key={i} href={`/tags/${tag.slug}`}>
          <a
            className="btn btn-outline-info mx-1 mt-3"
            style={{ textDecoration: 'none' }}
          >
            {tag.name}
          </a>
        </Link>
      )),
    showRelatedBlogs = (related) =>
      related.map((blog, i) => (
        <div className="col-md-4" key={i}>
          <article>
            <SmallCard blog={blog} />
          </article>
        </div>
      ));

  return (
    <>
      {head()}
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div className="row" style={{ marginTop: '-30px' }}>
                  <img
                    src={`${API}/blog/photo/${query.slug}`}
                    alt={blog.title}
                    className="img img-fluid featured-image"
                  />
                </div>
              </section>
              <section>
                <div className="container">
                  <h1 className="display-2 pt-3 pb-3 text-center fw-bold">
                    {blog.title}
                  </h1>
                  <p className="lead mt-3 mark">
                    Written by {blog.postedBy.name} | Published{' '}
                    {moment(blog.updatedAt).fromNow()}
                  </p>
                  <div className="pb-3">
                    {showBlogCategories(blog)}
                    {showBlogTags(blog)}
                    <div>
                      <br />
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="container">
              <section>
                <div className="col-md-12 lead">{parse(blog.body)}</div>
              </section>
            </div>
            <div className="container pb-5">
              <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
              <hr />
              <div className="row">{showRelatedBlogs(related)}</div>
            </div>
            <div className="container pb-5">
              <p>Show comments</p>
            </div>
          </article>
        </main>
      </Layout>
    </>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { blog: data, query };
    }
  });
};

export default withRouter(SingleBlog);
