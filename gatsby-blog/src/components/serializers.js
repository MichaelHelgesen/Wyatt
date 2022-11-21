import * as React from "react"

const serializers = {
      types: {
        block: props => {
            switch (props.node.style || "normal") {
                case "h1":
                    return (
                        <h1 style={{background: "red"}}>
                            {props.children}
                        </h1>
                    )
                case "h2":
                    return (
                        <h2>
                            {props.children}
                        </h2>
                    )
            }
        },
    },
}

export default serializers
