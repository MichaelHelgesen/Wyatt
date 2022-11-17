import * as React from "react"
import { Link, graphql } from "gatsby"
import Menu from "../components/menu"
import Header from "../components/header"
import BlockContent from "@sanity/block-content-to-react"
import serializers from "../components/serializers"
import { PortableText } from "@portabletext/react"
import Footer from "../components/footer"

export const pageQuery = graphql`
  query ($id: String!) {
    page: sanityPage(id: { eq: $id }) {
      id
      introduction
      title
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

const Page = ({ data }) => {
  console.log(data.allSanityDemotext)
  return (
    <div>
      <Header />
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            textAlign: "left",
          }}
        >
          {data.page.title}
        </h1>
        <div
          style={{
            fontWeight: "bold",
            borderBottom: "1px solid black",
            paddingBottom: "10px"
          }}
        >
          {data.page.introduction ? (
            <p>
              {data.page.introduction}
            </p>
          ) : (
            <PortableText
              value={data.allSanityDemotext.edges[0].node._rawDemotext[1].content}
              components={serializers}
            />
          )}
        </div>
        <div
          style={{
            marginTop: "40px",
            paddingBottom: "50px"
          }}
        >
          {data.page.content ? (
            <PortableText
              value={data.page._rawContent}
              components={serializers}
            />
          ) : (
            <PortableText
              value={data.allSanityDemotext.edges[0].node._rawDemotext[0].content}
              components={serializers}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Page
