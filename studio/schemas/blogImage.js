export default {
  name: "blogImage",
  type: "object",
  title: "Image",
  fields: [
    {
      name: "image",
      type: "image",
    },
    {
      type: "string",
      name: "alt",
      title: "Alt-tekst",
      description:
        "A text that describes the content of the image. How would you describe it for those who can´t see it?",
      options: {
        isHighlighted: true,
      },
    },
    {
      type: "string",
      name: "description",
      title: "Image caption",
      description: `A image caption if needed`,
      options: {
        isHighlighted: true,
      },
    },
  ],
  options: {
    hotspot: true,
    metadata: ["lqip"],
  },
  preview: {
    select: {
      title: "alt",
      description: "description",
      media: "asset",
    },
  },
};
