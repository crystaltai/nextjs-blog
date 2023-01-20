import Layout from '../../components/layout';
import { getAllPostsIds, getPostData } from '../../lib/posts';
import Head from 'next/head';

export async function getStaticPaths() {
  const paths = getAllPostsIds();

  return {
    paths, // Contains the array of known paths, which include the params defined by pages/posts/[id].js
    fallback: false,
  };
}

// Uses getPostData() in getStaticProps() to get the post data and return it as props
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id); // Need to add await because getPostData() uses await
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      {/* This is React's replacement for using innerHTML in the browser DOM */}
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}
