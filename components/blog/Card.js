import parse from 'html-react-parser';
import moment from 'moment';
import Link from 'next/link';
import { API } from '../../config';

const Card = ({ blog }) => {
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
      ));

  return (
    <div className="lead pb-4">
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <a style={{ textDecoration: 'none' }}>
            <h2 className="pt-3 pb-3 fw-bold">{blog.title}</h2>
          </a>
        </Link>
      </header>
      <section>
        <p className="mark ml-1 pt-2 pb-2">
          Written by {blog.postedBy.name} | Published{' '}
          {moment(blog.updatedAt).fromNow()}
        </p>
      </section>
      <section>
        {showBlogCategories(blog)}
        {showBlogTags(blog)}
        <div>
          <br />
        </div>
      </section>
      <div className="row">
        <div className="col-md-4">
          <section>
            <img
              className="img img-fluid"
              style={{ maxHeight: '150px', width: 'auto' }}
              src={`${API}/blog/photo/${blog.slug}`}
              alt={blog.title}
            />
          </section>
        </div>
        <div className="col-md-8">
          <section>
            <div>{parse(blog.excerpt)}</div>
            <Link href={`/blogs/${blog.slug}`}>
              <a
                className="btn btn-primary pt-2"
                style={{ textDecoration: 'none' }}
              >
                Read more
              </a>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Card;
