import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

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
    <div>
      <h1
        style={{
          textAlign: "center",
          color: "white",
          letterSpacing: "-8px",
          margin:"0",
          padding: "0",
          padding: "30px 0"
        }}
      >
        <span
          style={{
            background:"black",
            display:"inline-block",
            width:"100px",
            height: "100px",
            borderRadius: "50%",
          }}
        >
          <span
          style={{
            display: "flex",
            height:"100%",
            marginLeft: "-7px",
            alignItems: "center",
            justifyContent:"center"
          }}
          >
        LW
        </span>
        </span>
      </h1>
      
      <ul
        style={{
          display: "flex",
          listStyleType: "none",
          justifyContent: "space-between",
          borderBottom: "1px solid black",
          borderTop: "1px solid black",
          margin: "0",
          padding: "20px",
        }}
      >
        {menuItems.map((post, index) => (
          <li
            key={index}
            style={{
              margin: "0",
              padding: "0",
            }}
          >
            <Link to={`/${post.slug.current}`}><span style={{color:"black"}}>{post.title}</span></Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Menu
