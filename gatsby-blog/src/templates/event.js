import * as React from "react"
import { Link, graphql } from "gatsby"
import Header from "../components/header"
import serializers from "../components/serializers"
import { PortableText } from "@portabletext/react"
import Footer from "../components/footer"
import Breadcrumb from "../components/breadcrumb"

export const pageQuery = graphql`
  query ($id: String!) {
    event: sanityEvent(_id: { eq: $id }) {
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
    quotes: allSanityQuote(filter: {event: {elemMatch: {_id: {eq: $id}}}}) {
      edges {
        node {
          quote
          event {
            _id
          }
          person {
            firstName
            lastName
            title
          }
        }
      }
    }
  }
`

const EventPosts = ({ data, pageContext }) => {
  console.log(data.quote)
  return (
    <div>
      <Header />
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <Breadcrumb pageContext={pageContext}/>
        <h1
          style={{
            textAlign: "left",
          }}
        >
          {data.event.title}
        </h1>
        <div
          style={{
            fontWeight: "bold",
            borderBottom: "1px solid black",
            paddingBottom: "10px",
          }}
        >
          <div>
          {data.quotes.edges.map(el => {
            return (
              <p>{`"${el.node.quote}" - ${el.node.person.firstName} ${el.node.person.lastName} ${el.node.person.title}`}</p>
            )
          })}
        </div>
          {data.event.introduction ? (
            <p>{data.event.introduction}</p>
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
          {data.event.content ? (
            <PortableText
              value={data.event._rawContent}
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

export default EventPosts
