import * as React from "react"
import { Link, graphql } from "gatsby"
import Header from "../components/header"
import serializers from "../components/serializers"
import { PortableText } from "@portabletext/react"
import Footer from "../components/footer"
import Breadcrumb from "../components/breadcrumb"

export const pageQuery = graphql`
  query ($id: String!) {
    podcast: sanityPodcast(_id: { eq: $id }) {
      id
      introduction
      title
      length
      guests {
        firstName
        lastName
      }
      date
      podcast {
        url
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

const PodcastPage = ({ data, pageContext }) => {
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
        <Breadcrumb pageContext={pageContext} />
        <h1
          style={{
            textAlign: "left",
          }}
        >
          {data.podcast.title}
        </h1>
        <audio controls>
          <source
            src={data.podcast.podcast.url}
            type={"audio/ogg"}
          />
        </audio>
        <br />
        Release date:
        <small>{data.podcast.date}</small>
        <br />
        Guest(s):
        <small>
          {data.podcast.guests.map(node => {
            return <span>{node.firstName}, </span>
          })}
        </small>
        <div
          style={{
            fontWeight: "bold",
            borderBottom: "1px solid black",
            paddingBottom: "10px",
          }}
        >
          {data.podcast.introduction ? (
            <p>{data.podcast.introduction}</p>
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
          {data.podcast.content ? (
            <PortableText
              value={data.podcast._rawContent}
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

export default PodcastPage
