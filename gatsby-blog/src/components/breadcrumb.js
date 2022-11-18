import * as React from "react"
import { Link } from "gatsby"

const Breadcrumb = ({ pageContext }) => {
  return (
    <small
      style={{
        display: "block",
        paddingTop: "30px",
      }}
    >
      <Link to={`/`}>home</Link> /{" "}
      {pageContext.type != "SanityPage" && (
        <span>
        <Link to={`${pageContext.pathUrl}`}>
          {pageContext.pathUrl.replace(/[^a-zA-Z,.!?\d\s:]/gi, "")}
        </Link>
         {" /"}</span>
      )}
      {" "} {pageContext.slug}
    </small>
  )
}

export default Breadcrumb
