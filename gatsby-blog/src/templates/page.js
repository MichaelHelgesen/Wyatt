import * as React from "react"
import { Link, graphql } from "gatsby"
import Menu from "../components/menu"
import Layout from "../components/layout"
//import BlockContent from '@sanity/block-content-to-react'
//import serializers from "../components/serializers"
//import * as style from "../templates/page.module.scss"
//import BlogList from "../components/blogList"
//import Notes from "../components/notesList"
//import BookList from "../components/bookList"
//import CategoryList from "../components/categoryList"
//import { Helmet } from "react-helmet"
//import ImageGallery from "../components/imageGallery"
//import Dictionary from "../components/dictionary"

export const pageQuery = graphql`
query ($id: String!){
     page: sanityPage(id: {eq: $id}) {
        id
        introduction
        title
        _rawContent(resolveReferences:{maxDepth:10})
      }
      site {
        siteMetadata {
          title
          description
        }
      }
    }
`

const Page = ({ data }) => {

    return (
        <div>
            <Menu />
            <Layout>
                <div>
                    <meta charSet="utf-8" />
                    <title>{data.page.title}{data.site.siteMetadata.titleTemplate}</title>
                    <link rel="canonical" href={`${data.site.siteMetadata.url}/${data.page.title.toLowerCase()}`} />
                </div>
                <div>
                    <div>
                        <div>
                            <small>
                                <Link to={`/`}>hjem</Link>{data.page.title === "Kategorier" ? <span> / <Link to={`/blogg/`}>blogg</Link> /</span> : <span> /</span>}
                            </small>
                            <h1>{data.page.title}</h1>
                            <p>{data.page.introduction}</p>
                        </div>
                        <div></div>
                    </div>
                    <div>
                    </div>
                    {data.page.title === "Blogg" ? <div></div> : null}
                </div>
            </Layout>
        </div>
    )
}

export default Page