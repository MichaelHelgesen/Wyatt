import { MdOpenInBrowser } from 'react-icons/md'

export default {
    title: 'Page',
    name: 'page',
    type: 'document',
    icon: MdOpenInBrowser,
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            title: "Slug",
            name: "slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 200,
                slugify: input => input
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .slice(0, 200)
            }
        },
        {
            description: "A paragraph that summarises the content and invites to reading more.",
            title: 'Leading paragraph',
            name: 'introduction',
            rows: 5,
            type: 'text',
        },
        {
            description: "An image for the blog preview",
            type: 'blogPostImage',
            name: "image"
        },
        {
            description: "The main text of the podcast post. Keep paragraphs short, and put the most important content first.",
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
            title: 'Title, ascending',
            name: 'titleAsc',
            by: [
                { field: 'title', direction: 'asc' }
            ]
        },
        {
            title: 'Title, descending',
            name: 'titleDesc',
            by: [
                { field: 'title', direction: 'desc' }
            ]
        },
    ],
    preview: {
        select: {
            title: 'title',
            description: 'introduction'
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

