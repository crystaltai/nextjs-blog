import Layout from '../../components/layout';
import { getAllPostsIds, getPostData } from '../../lib/posts';

export async function getStaticPaths() {
  const paths = getAllPostsIds();

  return {
    paths, // Contains the array of known paths, which include the params defined by pages/posts/[id].js
    fallback: false,
  };
}

// Uses getPostData() in getStaticProps() to get the post data and return it as props
export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  );
}
