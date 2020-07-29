import Head from 'next/head'
import Link from 'next/link';
import Moment from 'react-moment';
import Markdown from 'react-markdown';
import { request } from '../lib/lexascms';

import Layout from '../components/layout';

export default function Page({ post }) {
  return (
    <Layout>
      <Head>
        <title>{post.title} | LexasCMS Next.js Example Blog</title>
      </Head>

      <h1 className="text-4xl sm:text-5xl leading-10 sm:leading-14 font-bold mb-8 sm:text-center">{post.title}</h1>
  
      <div className="text-lg font-medium text-gray-900 sm:text-center mb-10">
        Published on <Moment format="MMMM D, YYYY">{post.publishedAt}</Moment> by {post.author.name}
      </div>
  
      <div className="max-w-screen-md mx-auto">
        <img src={post.coverImage.url} alt="" className="w-full object-cover rounded mb-6" />
  
        <div className="text-gray-700 leading-8 space-y-4 mb-8">
          <Markdown source={post.mainContent} />
        </div>
  
        <Link href="/">
          <a className="text-gray-900 font-medium hover:text-gray-700">&larr; Back to Posts</a>
        </Link>
      </div>
    </Layout>
  )
}

export const blogPostsQuery = `
  query {
    blogPostCollection(limit: 100) {
      items {
        slug
      }
    }
  }
`;

export const blogPostQuery = `
  query BlogPostById($postSlug: String!) {
    blogPostCollection(filter: {
      slug: { _eq: $postSlug }
    }) {
      items {
        title
        publishedAt
        coverImage {
          url
        }
        author {
          name
        }
        excerpt
        mainContent
      }
    }
  }
`;

export async function getStaticPaths() {
  // Get blog posts
  const result = await request({ query: blogPostsQuery });
  // Generate paths for pages
  const paths = result.blogPostCollection.items.map(blogPost => ({
    params: { slug: blogPost.slug }
  }));
  // Return paths
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  // Fetch blog post from LexasCMS
  const result = await request({
    query: blogPostQuery,
    variables: { postSlug: params.slug }
  });
  // Return props
  return {
    props: {
      post: result.blogPostCollection.items[0]
    }
  };
}
