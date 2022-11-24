/* eslint-disable react/prop-types */
import * as React from "react"
import getYouTubeId from "get-youtube-id"

const Preview = ({value}) => {
    const id = getYouTubeId(value.url)
    const url = `https://youtube.com/embed/${id}`

    if(!id) {
        return(
            <div>Ingen eller feil Youtube-kode</div>
        )
    }
	return (
        <iframe 
            width="100%" 
            height="400" 
            src={`${url}`}
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
        </iframe>
    )
}



export default {
    name: 'youtubeLink',
    title: 'Youtube-link',
    type: 'object',
    fields: [
        {
            name: "youTubeEmbed",
            title: "YouTube embed-link",
            type: "url",
        }
    ],
    preview: {
        select: {
            url: "youTubeEmbed"
        },
        component: Preview
    } 
}