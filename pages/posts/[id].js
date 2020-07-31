import Layout from "../../components/layout";
import { getAllPostIds, getPostdata } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'

// css styles
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

// array of possible values for ids is the value of the paths key of returned object
export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

// postData is part of the static props we need about post id and id etc.
export async function getStaticProps( { params }) {
    const postData = await getPostdata(params.id)
    return {
        props: {
            postData
        }
    }
}