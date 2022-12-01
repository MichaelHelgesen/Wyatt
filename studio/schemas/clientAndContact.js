export default {
  description: "client and contact person",
  name: "clientAndContact",
  type: "object",
  fields: [
    {
      title: "Personal or payed?",
      name: "status",
      type: "boolean",
    },
    {
      type: "reference",
      name: "clientList",
      to: [{ type: "client" }],
      hidden: ({ parent }) => !parent?.status,
      /* options: {
              filter: ({ parent }) => {
                const existingClient = parent.clientList.map((item) => {
                  return item._ref;
                });
                return {
                  filter: "_id in $ref == false",
                  params: {
                    ref: existingClient,
                  },
                };
              },
            }, */
    },
    {
      type: "reference",
      name: "personList",
      to: [{ type: "person" }],
      hidden: ({ parent }) => (!parent?.clientList),
      options: {
        filter: ({ parent }) => {
          const existingClient = parent.clientList._ref;
          return {
            filter: "client[0]._ref == $ref",
            params: {
              ref: existingClient,
            },
          };
        },
      },
    },
  ],
};
