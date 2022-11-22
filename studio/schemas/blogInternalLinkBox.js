export default {
    name: "blogInternalLink",
    type: "object",
    title: "Link to blog or podcast",
    fields: [
      {
        name: "bloglink",
        title: "Blogpost",
        type: "reference",
        to: [{ type: "blog" }, { type: "podcast" }, { type: "work" }, { type: "event" }, { type: "page" }],
      },
    ],
  }