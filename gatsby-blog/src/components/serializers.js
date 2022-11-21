import * as React from "react"
import { Link } from "gatsby"
import BlockContent from '@sanity/block-content-to-react'

const serializers = {
/*     types: {
        block: props => {
            const style = props.node.style
            switch (props.node.style || "normal") {
                case "h1":
                    return (
                        <h1 id={`title-${convertTitle(props.children)}`}>
                            {titleMaker(props.children, style)}
                        </h1>
                    )
                case "h2":
                    return (
                        <h2 id={`title-${convertTitle(props.children)}`} className={"titleLink"}>
                            {titleMaker(props.children, style)}
                        </h2>
                    )
                case "h3":
                    return (
                        <h3 id={`title-${convertTitle(props.children)}`} className={"titleLink"}>
                            {titleMaker(props.children, style)}
                        </h3>
                    )
                case "h4":
                    return (
                        <h4 id={`title-${convertTitle(props.children)}`} className={"titleLink"}>
                            {titleMaker(props.children, style)}
                        </h4>
                    )
                case "h5":
                    return (
                        <h5 id={`title-${convertTitle(props.children)}`} className={"titleLink"}>
                            {titleMaker(props.children, style)}
                        </h5>
                    )
                case "h6":
                    return (
                        <h6 id={`title-${convertTitle(props.children)}`} className={"titleLink"}>
                            {titleMaker(props.children, style)}
                        </h6>
                    )
                case "blockquote": return (<blockquote>- {props.children}</blockquote>)
                default: return (<p>{props.children}</p>)
            }
        },
    }, */
    marks: {
        bloglink: props => {
            return <a>dd</a>
        },
    },
}

export default serializers;
