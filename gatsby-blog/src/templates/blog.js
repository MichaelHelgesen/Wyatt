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

export const pageQuery = graphql`
  query ($id: String!) {
    blog: sanityBlog(id: { eq: $id }) {
      date(formatString: "YYYY MMM DD")
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
        siteUrl
      }
    }
    allSanityDemotext {
      edges {
        node {
          _rawDemotext(resolveReferences: { maxDepth: 10 })
          demotext {
            ... on SanityBlogDemo {
              _rawContent(resolveReferences: { maxDepth: 10 })
            }
          }
        }
      }
    }
  }
`

const BlogPage = ({ data, pageContext }) => {
  console.log(data.allSanityDemotext.edges[0].node.demotext)

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
          {data.blog.title}
        </h1>
        <small style={{ paddingBottom: "30px", display: "block" }}>
          {data.blog.date}
        </small>
        {data.blog.image ?
        <div>
        <SanityImage
          // pass asset, hotspot, and crop fields
          {...data.blog.image.image}
          // tell Sanity how large to make the image (does not set any CSS)
          width={300}
          height={Math.round(
            300 / data.blog.image.image.asset.metadata.dimensions.aspectRatio
          )}
          alt={data.blog.image.alt}
          //config={{blur:50}}
          // style it how you want it
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Image description */}
        <p>{data.blog.image.description}</p>
      </div>
       : null}
        <div
          style={{
            fontWeight: "bold",
            borderBottom: "1px solid black",
            paddingBottom: "10px",
          }}
        >
          {data.blog.introduction ? (
            <p>{data.blog.introduction}</p>
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
          {data.blog.content ? (
            <PortableText
              value={data.post._rawContent}
              components={serializers}
            />
          ) : (
            <PortableText
              value={
                data.allSanityDemotext.edges[0].node.demotext[2]._rawContent
              }
              components={{
                block: {},
                types: {
                  youtubeLink: props => {
                    console.log(props)
                    const id = getYouTubeId(props.value.youTubeEmbed)
                    const url = `https://youtube.com/embed/${id}`
                    return (
                      <div>
                        <iframe
                          width="100%"
                          height="400"
                          src={`${url}`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )
                  },
                  blogInternalLink: props => {
                    return (
                      <a
                        style={{
                          border: "1px solid black",
                          padding: "10px",
                          display: "block",
                        }}
                        href={`${data.site.siteMetadata.siteUrl}${
                          props.value.bloglink._type != "page"
                            ? `/${props.value.bloglink._type}`
                            : ""
                        }/${
                          props.value.bloglink.slug.current != "home"
                            ? `${props.value.bloglink.slug.current}`
                            : ""
                        }`}
                      >
                        <h5 style={{ display: "block", margin: "0" }}>
                          {props.value.bloglink.title}
                        </h5>
                        <span>{props.value.bloglink.description}</span>
                      </a>
                    )
                  },
                  blogImage: props => {
                    return (
                      <div>
                        <SanityImage
                          // pass asset, hotspot, and crop fields
                          {...props.value.image}
                          // tell Sanity how large to make the image (does not set any CSS)
                          width={300}
                          height={Math.round(
                            300 /
                              props.value.image.asset.metadata.dimensions
                                .aspectRatio
                          )}
                          alt={props.value.alt}
                          //config={{blur:50}}
                          // style it how you want it
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        {/* Image description */}
                        <p>{props.value.description}</p>
                      </div>
                    )
                  },
                  podcastInternalLink: props => {
                    return (
                      <audio controls>
                        <source
                          src={props.value.podcastModule.podcast.url}
                          type={"audio/ogg"}
                        />
                      </audio>
                    )
                  },
                },
                marks: {
                  highlight: props => {
                    return (
                      <span style={{ backgroundColor: "yellow" }}>
                        {props.text}
                      </span>
                    )
                  },
                  internalRegularLink: props => {
                    console.log(props)
                    return (
                      <span>
                        <a
                          href={`${
                            props.value.internalReference._type != "page"
                              ? `/${props.value.internalReference._type}/${props.value.internalReference.slug.current}`
                              : `/${props.value.internalReference.slug.current}`
                          }`}
                        >
                          {props.text} <MdSouthWest />
                        </a>
                      </span>
                    )
                  },
                  externalRegularLink: props => {
                    console.log(props)
                    return (
                      <span>
                        <a href={props.value.externalReference}>
                          {props.text} <MdNorthEast />
                        </a>
                      </span>
                    )
                  },
                },
              }}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default BlogPage
