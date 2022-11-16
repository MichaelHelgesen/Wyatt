import { sanityClient } from '../sanity'
import Menu from '../components/Menu';


const Post = ({ data }) => {
    console.log(data.allPosts.title)
  return (
    <div>
    <p>dd</p>
   <div>{data.allPosts.title}</div>
   </div>
  )
};
export default Post;

export async function getStaticPaths() {
    const query = '*[_type == "post" && defined(slug.current)][].slug.current'
    const response = await sanityClient.fetch(query)
    const paths = response.map((slug) => ({
      params: {slug}
    }))
    return {
      paths: paths,
      fallback: false,
    }
  }

  export async function getStaticProps({ params }) {
    const allPosts = await sanityClient.fetch(`
        *[_type == "post" && slug.current == $slug] [0] | order(date desc, _createdAt desc) {
          _id,
          title,
        }`,
      {
        slug: params.slug
      }
    )
    return {
      props: {
        data: {
          allPosts,
        },
      },
    }
  }