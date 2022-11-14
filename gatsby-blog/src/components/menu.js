import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
//import * as style from "../components/menu.module.scss"
/*
export const menuQuery = graphql`
  query {
    allSanityMenu {
        edges {
          node {
            menupages {
              id
              slug {
                current
              }
              title
            }
            _id
          }
        }
      }
    }
`
*/
const Menu = () => {
    const data = useStaticQuery(graphql`
      query menuQuery {
        allSanityMenu {
            edges {
              node {
                menupages {
                  id
                  slug {
                    current
                  }
                  title
                }
                _id
              }
            }
          }
      }
    `)
    
  const menuItems = data.allSanityMenu.edges[0].node.menupages
  return (
    <Layout>
      <h1>Laverne Wyatt</h1>
      <ul
        style={{
          display: "flex",
          listStyleType: "none",
          justifyContent: "space-between",
        }}
      >
        {menuItems.map((post, index) => (
        <li key={index}>
        <Link to={`/${post.slug.current}`}>{post.title}</Link>
      </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Menu
