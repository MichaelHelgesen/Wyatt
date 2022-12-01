import React from "react";

const ImageGallery = ({props}) => {
    return (
        <div style={{display: "flex", flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",}}>
            {props.map((item, index) => {
              return (
                <img width="31.33%" key={index} src={item.url}/> 
              )
            })}
            </div>
    )
}

export default ImageGallery