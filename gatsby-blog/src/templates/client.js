import * as React from "react"
import { Link, graphql } from "gatsby"
import Header from "../components/header"
import serializers from "../components/serializers"
import { PortableText } from "@portabletext/react"
import Footer from "../components/footer"
import Breadcrumb from "../components/breadcrumb"
import { MdSouthWest, MdNorthEast } from "react-icons/md"
import getYouTubeId from "get-youtube-id"
import SanityImage from "gatsby-plugin-sanity-image"
import ImageGallery from "../components/imageGallery"

export const pageQuery = graphql`
  query ($id: String!) {
    client: sanityClient(id: { eq: $id }) {
      id
      name
      image {
        alt
        description
        image {
          asset {
            _id
            metadata {
              dimensions {
                aspectRatio
              }
            }
          }
        }
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
    person: allSanityPerson(
      filter: {
        client: {
          elemMatch: { _ref: { eq: "161a9f8d-5ad3-4cbd-8002-a65bc75bfc1c" } }
        }
      }
    ) {
      edges {
        node {
          firstName
          client {
            id
            name
          }
        }
      }
    }
  }
`

const ClientPage = ({ data, pageContext }) => {
  console.log("person", data.person)
  console.log("person", pageContext)
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
          {data.client.name}
        </h1>
        {data.client.image ? (
          <div>
            <SanityImage
              // pass asset, hotspot, and crop fields
              {...data.client.image.image}
              // tell Sanity how large to make the image (does not set any CSS)
              width={300}
              height={Math.round(
                300 /
                  data.client.image.image.asset.metadata.dimensions.aspectRatio
              )}
              alt={data.client.image.alt}
              //config={{blur:50}}
              // style it how you want it
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {/* Image description */}
            <small>{data.client.image.description}</small>
          </div>
        ) : null}
        <div
          style={{
            fontWeight: "bold",
            borderBottom: "1px solid black",
            paddingBottom: "10px",
            paddingTop: "10px",
          }}
        >
          {data.client.introduction ? (
            <p>{data.client.introduction}</p>
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
          {data.client.content ? (
            <PortableText
              value={data.client._rawContent}
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

export default ClientPage
