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
    work: sanityWork(_id: { eq: $id }) {
      date(formatString: "YYYY MM DD")
      id
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
      introduction
      title
      ClientAndContact {
        status
        clientList {
          name
          webpage
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
        }
        personList {
          firstName
        }
      }
      cloudinaryList {
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

const WorkPage = ({ data, pageContext }) => {
  console.log(data.person)
  console.log(pageContext)
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
          {data.work.title}
        </h1>
        <small
          style={{
            display: "block",
            marginBottom: "30px",
          }}
        >
          Delivered: {data.work.date}
        </small>
        {!data.work.ClientAndContact.status ? <p style={{
              padding: "5px",
              background: "#eee",
            }}>personal</p> : null }
        {data.work.ClientAndContact.clientList && data.work.ClientAndContact.status ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "flex-start",
              alignItems: "center",
              padding: "5px",
              background: "#eee",
            }}
          >
            <div
              style={{
                flex: "1",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {data.work.ClientAndContact.clientList.name}{data.work.ClientAndContact.personList ?<small> - {data.work.ClientAndContact.personList.firstName}</small>: null }
                  <br />
                </div>
                <a href={data.work.ClientAndContact.clientList.webpage}>visit</a>
              </div>
            </div>
            {data.work.ClientAndContact.clientList.image ? (
              <div
                style={{
                  marginRight: "10px",
                }}
              >
                <SanityImage
                  // pass asset, hotspot, and crop fields
                  {...data.work.ClientAndContact.clientList.image.image}
                  // tell Sanity how large to make the image (does not set any CSS)
                  width={300}
                  height={Math.round(
                    300 /
                      data.work.ClientAndContact.clientList.image.image.asset.metadata.dimensions
                        .aspectRatio
                  )}
                  alt={data.work.ClientAndContact.clientList.image.image}
                  //config={{blur:50}}
                  // style it how you want it
                  style={{
                    width: "30px",
                    height: "30px",
                    objectFit: "cover",
                  }}
                />
              </div>
            ) : null}
          </div>
        ) : null}
        {data.work.image ? (
          <div>
            <SanityImage
              // pass asset, hotspot, and crop fields
              {...data.work.image.image}
              // tell Sanity how large to make the image (does not set any CSS)
              width={300}
              height={Math.round(
                300 /
                  data.work.image.image.asset.metadata.dimensions.aspectRatio
              )}
              alt={data.work.image.alt}
              //config={{blur:50}}
              // style it how you want it
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {/* Image description */}
            <small>{data.work.image.description}</small>
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
          {data.work.introduction ? (
            <p>{data.work.introduction}</p>
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
          {data.work.content ? (
            <PortableText
              value={data.work._rawContent}
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
        <div>
          {data.work.cloudinaryList.length ? 
            <ImageGallery props={data.work.cloudinaryList}/>
           : null }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default WorkPage
