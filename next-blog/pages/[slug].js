import { sanityClient } from '../sanity'
import Menu from '../components/Menu';


const Page = ({ data }) => {
  return (
    <div>
     <Menu test={data.allPages2}/>
    <h2 style={{
      textAlign: "center",
      opacity: ".8"
    }}>
      {data.allPages.title}
      </h2>
   </div>
  )
};
export default Page;

export async function getStaticPaths() {
    const query = '*[_type == "page" && defined(slug.current)][].slug.current'
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
    const allPages = await sanityClient.fetch(`
        *[_type == "page" && slug.current == $slug] [0] {
          _id,
          title,
        }`,
      {
        slug: params.slug
      }
    )
    const allPages2 = await sanityClient.fetch(`
        *[_type == "page"] {
          title,
        }`,
    )
    return {
      props: {
        data: {
          allPages,
          allPages2
        },
      },
    }
  }