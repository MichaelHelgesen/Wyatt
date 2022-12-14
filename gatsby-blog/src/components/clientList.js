import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

const createSlug = string =>
    string.toLowerCase().replace(/\s+/g, "-").slice(0, 200)

const ClientList = () => {
  const data = useStaticQuery(graphql`
    query clientQuery {
      allSanityClient{
        edges {
          node {
            _rawContent
            name
          }
        }
      }
    }
  `)
  return (
    <div>
      {data.allSanityClient.edges.map((post, index) => (
         <Link to={post.node.slug ? (`${post.node.slug.current}`) : (`${createSlug(post.node.name)}`)} key={index} style={{textDecoration:"none"}}>
         <div
           key={index}
           style={{ 
             padding: "20px",
             margin: "20px 0",
             border:"1px solid black" 
         }}
         >
           <h4
             style={{
               margin: "0",
               textDecoration: "none"
             }}
           >
             {post.node.name}
           </h4>
           <p style={{margin:"0", color:"black"}}>
             {post.node.description}
           </p>
         </div>
         </Link>
      ))}
    </div>
  )
}

export default ClientList
