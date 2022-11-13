import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

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
  console.log(data);
  return (
    <Layout location={location} title={"Laverne Wyatt"}>
      <div>
        {data.allSanityPost.edges.map((post, index) => (

            <div>
                <small >{post.node.read}</small>
                <small >{post.node.author}</small>
                <h2 >{post.node.title}</h2>
            </div>
        ))}
        <div></div>
    </div>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />


