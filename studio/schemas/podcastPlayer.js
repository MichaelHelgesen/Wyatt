import { React } from 'react'

const Preview = (value) => {
    //console.log(value)
	//const { url } = value
	return(<audio src={value} controls />)
}

export default {
    name: 'podcastPlayer',
    type: 'object',
    title: 'Podcast Embed',
    fields: [
        {
            type: "cloudinary.asset",
            name: "podcast",
            description: "This asset is served from Cloudinary",
        },
    ],
    preview: {
        select: {
            url: 'https://res.cloudinary.com/mikkesblogg/video/upload/v1668506637/Wyatt/Wav_868kb_r3khir.wav'
        },
        component: Preview
    }
}