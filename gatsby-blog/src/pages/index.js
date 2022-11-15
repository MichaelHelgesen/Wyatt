import * as React from "react"
import { graphql } from "gatsby"
import Menu from "../components/menu"
import Layout from "../components/layout"

export const pageQuery = graphql`
  query {
    allSanityPost{
      edges {
        node {
          title
          date(formatString: "DD MMMM YY")
          description
          _rawContent(resolveReferences: {maxDepth: 10})
        }
      }
    }
  }
`


 

const BlogIndex = ({ data, location }) => {
  
  //const siteTitle = data.site.siteMetadata?.title || `Title`
  //const posts = data.allMarkdownRemark.nodes
  return (
    <div>
       <div>
        <Menu />
        <Layout>
        {data.allSanityPost.edges.map((post, index) => (

            <div style={{ backgroundColor: '#ddd', padding: '20px', margin: '20px 0' }}>
                <h2 style={{margin: "0"}}>{post.node.title}</h2>
            </div>
        ))}
        </Layout>
    </div> 
    </div>
  )
}



export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
//export const Head = () => <Seo title="All posts" />


