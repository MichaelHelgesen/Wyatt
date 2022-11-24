import * as React from "react"
import { Link, graphql } from "gatsby"
import Header from "../components/header"
import serializers from "../components/serializers"
import { PortableText } from "@portabletext/react"
import Footer from "../components/footer"
import BlogList from "../components/blogList"
import WorkList from "../components/workList"
import EventList from "../components/eventList"
import PodcastList from "../components/podcastList"
import Breadcrumb from "../components/breadcrumb"

const createSlug = string =>
  string.toLowerCase().replace(/\s+/g, "-").slice(0, 200)

export const pageQuery = graphql`
  query ($id: String!) {
    page: sanityPage(id: { eq: $id }) {
      id
      introduction
      slug {
        current
      }
      title
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
        }
      }
    }
  }
`

const Page = ({ data, pageContext }) => {
  console.log(data.allSanityDemotext.edges[0].node._rawDemotext[0].content)
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
          {data.page.title}
        </h1>
        <div>
          {data.page.slug.current === "blog" && <BlogList />}
          {data.page.slug.current === "work" && <WorkList />}
          {data.page.slug.current === "event" && <EventList />}
          {data.page.slug.current === "podcast" && <PodcastList />}
        </div>
        <div
          style={{
            fontWeight: "bold",
            borderBottom: "1px solid black",
            paddingBottom: "10px",
          }}
        >
          {data.page.introduction ? (
            <p>{data.page.introduction}</p>
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
          {data.page._rawContent ? (
            <PortableText
              value={data.page._rawContent}
              components={serializers}
            />
          ) : (
            <PortableText
              value={
                data.allSanityDemotext.edges[0].node._rawDemotext[0].content
              }
              components={{
                block: {},
                types: {
                  youtubeLink: props => (
                    <h1 className="text-2xl">{props.value.youTubeEmbed}</h1>
                  ),
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
                  podcastInternalLink: props => {
                    console.log(props)

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
                },
                podcast: {
                  podcast: props => {
                    return (
                      <span style={{ backgroundColor: "yellow" }}>
                        ds
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

export default Page
