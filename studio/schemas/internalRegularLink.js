export default {
    name: "internalRegularLink",
    type: "object",
    title: "Internal link",
    fields: [
      {
        name: "internalReference",
        type: "reference",
        to: [{ type: "blog" }, { type: "podcast" }, { type: "work" }, { type: "event" }, { type: "page" }],
      },
    ],
  };
  