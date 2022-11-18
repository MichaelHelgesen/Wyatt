import * as React from "react"
import { Link, graphql } from "gatsby"
import Header from "../components/header"
import serializers from "../components/serializers"
import { PortableText } from "@portabletext/react"
import Footer from "../components/footer"
import Breadcrumb from "../components/breadcrumb"

export const pageQuery = graphql`
  query ($id: String!) {
    post: sanityPost(id: { eq: $id }) {
      id
      introduction
      title
      slug {
        current
      }
      content {
        _rawChildren
      }
      _rawContent(resolveReferences: { maxDepth: 10 })
    }
    site {
      siteMetadata {
        title
        description
      }
    }
    allSanityDemotext {
      edges {
        node {
          _rawDemotext(resolveReferences: { maxDepth: 10 })
        }
      }
    }
  }
`

const BlogPage = ({ data, pageContext }) => {
  return (
    <div>
      <Header />
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <Breadcrumb pageContext={pageContext} />
        <h1
          style={{
            textAlign: "left",
          }}
        >
          {data.post.title}
        </h1>
        <div
          style={{
            fontWeight: "bold",
            borderBottom: "1px solid black",
            paddingBottom: "10px",
          }}
        >
          {data.post.introduction ? (
            <p>{data.post.introduction}</p>
          ) : (
            <PortableText
              value={
                data.allSanityDemotext.edges[0].node._rawDemotext[1].content
              }
              components={serializers}
            />
          )}
        </div>
        <div
          style={{
            marginTop: "40px",
            paddingBottom: "50px",
          }}
        >
          {data.post.content ? (
            <PortableText
              value={data.post._rawContent}
              components={serializers}
            />
          ) : (
            <PortableText
              value={
                data.allSanityDemotext.edges[0].node._rawDemotext[0].content
              }
              components={serializers}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default BlogPage
