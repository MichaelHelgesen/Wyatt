import { MdTextFields } from "react-icons/md";

export default {
  title: "Demotexts",
  name: "demotext",
  type: "document",
  icon: MdTextFields,
  fields: [
    {
      description: "Demotexts for pages",
      name: "demotext",
      title: "Demotexts",
      type: "array",
      of: [{ type: "portableTextDemo" }]
    },
  ],
};
