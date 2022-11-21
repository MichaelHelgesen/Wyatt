export default {
    name: "blogInternalLink",
    type: "object",
    title: "Bloglink",
    fields: [
      {
        name: "bloglink",
        title: "Blogpost",
        type: "reference",
        to: [{ type: "post" }],
      },
    ],
  }
  