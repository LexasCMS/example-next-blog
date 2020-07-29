import { useRouter } from 'next/router'
import Head from 'next/head'
import { request } from '../../lib/lexascms';

import Layout from '../../components/layout';
import BlogPostSmall from '../../components/blog-post/small';
import Pagination from '../../components/pagination';

const postsOnFirstPage = 10;
const postsPerPage = 9;

export default function Page({ blogPosts, nextPage, prevPage }) {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>Page {router.query.pagenum} | LexasCMS Next.js Example Blog</title>
      </Head>

      <h1 className="text-6xl font-bold mb-10">Blog</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 row-gap-12 sm:row-gap-16">
        {blogPosts.items.map(blogPost => (
          <BlogPostSmall key={blogPost.id} post={blogPost} />
        ))}
      </div>
    
      <Pagination nextPage={nextPage} prevPage={prevPage} />
    </Layout>
  )
}

export const blogPostsCountQuery = `
  query {
    blogPostCollection(limit: 0) {
      total
    }
  }
`;

export const blogPageQuery = `
  query BlogPage($limit: CollectionLimitInput!, $skip: CollectionSkipInput!) {
    blogPostCollection(
      limit: $limit,
      skip: $skip,
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

function calculateTotalPages(itemCount) {
  return Math.ceil((itemCount - postsOnFirstPage) / postsPerPage) + 1;
}

export async function getStaticPaths() {
  // Get total number of blog posts
  const result = await request({ query: blogPostsCountQuery });
  // Calculate total pages
  const totalPages = calculateTotalPages(result.blogPostCollection.total);
  // Generate paths for pages
  const paths = [];
  if (totalPages > 1) {
    for (let i = 2; i <= totalPages; i++) {
      paths.push({
        params: { pagenum: `${i}` }
      });  
    }
  }
  // Return paths
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  // Get current page
  const currentPage = parseInt(params.pagenum, 10);
  // Fetch blog posts from LexasCMS
  const result = await request({
    query: blogPageQuery,
    variables: {
      limit: postsPerPage,
      skip: (postsPerPage * (currentPage - 2)) + postsOnFirstPage
    }
  });
  // Calculate total pages
  const totalPages = calculateTotalPages(result.blogPostCollection.total);
  // Return props
  return {
    props: {
      blogPosts: result.blogPostCollection,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
      prevPage: currentPage > 1 ? currentPage - 1 : null
    }
  };
}
