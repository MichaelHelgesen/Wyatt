
export default {
    title: 'Client',
    name: 'client',
    type: 'document',
    fields: [
        {
            description: "Company name or other name",
            title: 'Name',
            name: 'name',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            title: "Slug",
            name: "slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 200,
                slugify: input => input
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .slice(0, 200)
            }
        },
        {
            description: "URL to company webpage",
            title: 'Webpage',
            name: 'webpage',
            type: 'url',
            validation: Rule => Rule.uri(
                {
                    scheme: ['http', 'https']
                }
            )
        },
        {
            description: "Name of person in company",
            title: 'Person',
            name: 'person',
            type: 'string',
        },
        {
            description: "Email address to contact person",
            title: 'E-mail',
            name: 'email',
            type: 'string',
            validation: (Rule) =>
                Rule.regex(
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                    {
                        name: "email", // Error message is "Does not match email-pattern"
                        invert: false, // Boolean to allow any value that does NOT match pattern
                    }
                ),
        },

        {
            description: "A short, one to two lines, of what was delivered for the preview.",
            name: 'description',
            rows: 3,
            title: 'Short description for client list',
            type: 'text',
            validation: Rule => Rule.required()
        },
        {
            description: "A quote from the client about the work/service delivered",
            title: 'Quote',
            name: 'quote',
            rows: 5,
            type: 'text',
        },
        {
            description: "A paragraph that sumarises the content and invites to reading more.",
            title: 'Leading paragraph',
            name: 'introduction',
            rows: 5,
            type: 'text',
        },
        {
            description: "The main text of the post. Keep paragraphs short, and put the most important content first.",
            title: 'Main text',
            name: 'content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "H1", value: "h1" },
                        { title: "H2", value: "h2" },
                        { title: "H3", value: "h3" },
                        { title: "H4", value: "h4" },
                        { title: "H5", value: "h5" },
                        { title: "H6", value: "h6" },
                        { title: "Quote", value: "blockquote" },
                      ],
                },
            ]
        }
    ],
    orderings: [
        {
            title: 'Name, ascending',
            name: 'nameAsc',
            by: [
                { field: 'name', direction: 'asc' }
            ]
        },
        {
            title: 'Name, descending',
            name: 'nameDesc',
            by: [
                { field: 'name', direction: 'desc' }
            ]
        },
    ],
    preview: {
        select: {
            title: 'name',
            description: 'description',
        },
        prepare(selection) {
            const { title, description } = selection
            return {
                title: title,
                subtitle: `${description}`,
            }
        }
    }
}

