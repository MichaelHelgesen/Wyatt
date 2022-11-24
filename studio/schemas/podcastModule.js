export default {
  name: "podcastInternalLink",
  type: "object",
  title: "Link to podcast",
  fields: [
    {
      name: "podcastModule",
      title: "Podcast file",
      type: "reference",
      to: [{ type: "podcast" }],
    },
  ],
};
