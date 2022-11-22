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
    console.log(data)
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
          {data.page.title}
        </h1>
        <div>
          {data.page.slug.current === "blog" && <BlogList />}
          {data.page.slug.current === "work" && <WorkList />}
          {data.page.slug.current === "events" && <EventList />}
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
                block: {
                  // Ex. 1: customizing common block types
                  h1: ({children}) => <h1 className="text-2xl">{console.log(children)}{children}</h1>,
                  blockquote: ({children}) => <blockquote className="border-l-purple-500">{console.log(children)}{children}</blockquote>,
              
                  // Ex. 2: rendering custom styles
                  youtubeLink: ({children}) => (
                    <h2 className="text-lg text-primary text-purple-700">{console.log(children)}{children}</h2>
                  ),
                },
                types: {
                  // Ex. 1: customizing common block types
                  reference: (props) => <h1 className="text-2xl">{console.log("children", props.value)}{props.value}øøøø</h1>,
                  youtubeLink: (props) => <h1 className="text-2xl">{console.log("children", props.value.youTubeEmbed)}{props.value.youTubeEmbed}</h1>,
                },
                marks: {
                  // Ex. 1: customizing common block types
                  post: (props) => <h1 className="text-2xl">{console.log("children", props.value)}{props.value}øøøø</h1>,
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
