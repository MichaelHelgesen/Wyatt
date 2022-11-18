export default {
    name: 'podcastPlayer',
    type: 'object',
    title: 'Podcast Embed',
    fields: [
        {
            type: "cloudinary.asset",
            name: "podcast",
            title: "tekst",
            description: "This asset is served from Cloudinary",
        },
    ],   
}