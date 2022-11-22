import * as React from "react"
import { graphql } from "gatsby"
import Menu from "../components/menu"
import Layout from "../components/layout"
import Footer from "../components/footer"
import BlogList from "../components/blogList"

export const pageQuery = graphql`
  query {
    allSanityBlog{
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



const BlogIndex = ({ data, pageContext }) => {
  return (
    <div>
      <div>
        <Menu />
        <Layout>
          <h1 style={{margin:"0 0 5px 0"}}>
            Laverne Wyatt
            </h1>
          <h3 style={{margin:"0 0 50px 0"}}>
            Designer, speaker, podcaster and motivator</h3>
          <BlogList pageContext={pageContext}/>
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


