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
      description: "What work is the quote refering to?",
      name: "work",
      title: "Respective work",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "work" }],
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
    {
        description: "What event is the quote refering to?",
        name: "event",
        title: "Respective event",
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
  preview: {
    select: {
      quote: "quote",
      firstName: "person.firstName",
      lastName: "person.lastName",
    },
    prepare(selection) {
      const { quote, firstName, lastName } = selection;
      return {
        title: `${quote}`,
        subtitle: `${firstName} ${lastName}`,
      };
    },
  },
};
