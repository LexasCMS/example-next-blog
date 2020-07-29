import Head from 'next/head'
import { request } from '../lib/lexascms';

import Layout from '../components/layout';
import BlogPostLarge from '../components/blog-post/large';
import BlogPostSmall from '../components/blog-post/small';
import Pagination from '../components/pagination';

export default function Index({ blogPosts }) {
  return (
    <Layout>
      <Head>
        <title>LexasCMS Next.js Example Blog</title>
      </Head>

      <h1 className="text-6xl font-bold mb-10">Blog</h1>

      <BlogPostLarge post={blogPosts.items[0]} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 row-gap-12 sm:row-gap-16">
        {blogPosts.items.slice(1).map(blogPost => (
          <BlogPostSmall key={blogPost.id} post={blogPost} />
        ))}
      </div>
      
      {blogPosts.total > 10 ? <Pagination nextPage={2} /> : null}
    </Layout>
  )
}

export const blogPostsQuery = `
  query {
    blogPostCollection(
      limit: 10,
      order: [ publishedAt_DESC ]
    ) {
      total
      items {
        id
        slug
        title
        publishedAt
        coverImage {
          url
        }
        excerpt
      }
    }
  }
`;

export async function getStaticProps() {
  // Fetch blog posts from LexasCMS
  const result = await request({ query: blogPostsQuery });
  // Return props
  return {
    props: {
      blogPosts: result.blogPostCollection
    }
  };
}
