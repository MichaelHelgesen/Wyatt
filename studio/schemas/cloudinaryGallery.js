export default {
    name: 'imageGallery',
    type: 'object',
    title: 'Image gallery',
    fields: [
        {
            type: "array",
            title: "List of images from Cloudinary to be used as gallery",
            name: "cloudinaryList",
            description: "This asset is served from Cloudinary",
            of: [{ type: "cloudinary.asset" }],
        },
    ],   
}