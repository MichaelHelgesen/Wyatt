import { sanityClient } from '../sanity'

const Home = ({ posts }) => {
  //console.log(posts)
  return (
    <div>
    </div>
  )
}


export const getServerSideProps = async () => {
  const query = "*[ _type == 'post']"
  const posts = await sanityClient.fetch(query)
  return {
    props: {
      posts
    }
  }
}

export default Home