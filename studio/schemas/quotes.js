import { MdFormatQuote } from "react-icons/md";

export default {
  title: "Quote",
  name: "quote",
  type: "document",
  icon: MdFormatQuote,
  fields: [
    {
      description: "A short quote, describing the work and process",
      name: "quote",
      rows: 5,
      title: "Quote",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      description: "Who delivered the quote",
      name: "person",
      title: "Quote giver",
      type: "reference",
      to: [{ type: "person" }],
    },
    {
      description: "What work is the quote refering to? Choose from work and event in respective list.",
      name: "work",
      title: "Respective work or event",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "event" }],
          options: {
            filter: ({ parent }) => {
              const existingWork = parent.map((item) => {
                return item._ref;
              });
              return {
                filter: "_id in $ref == false",
                params: {
                  ref: existingWork,
                },
              };
            },
          },
        },
      ],
    },
  ],
};
