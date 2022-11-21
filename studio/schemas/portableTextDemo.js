import React from "react"

const highlightRender = props => (
    <span style={{ backgroundColor: 'yellow' }}>{props.children}</span>
)

export default {
    title: 'Portable TExt Demo',
    name: 'portableTextDemo',
    type: 'object',
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
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                            { title: 'Code', value: 'code' },
                            { "title": "Underline", "value": "underline" },
                            { "title": "Strike", "value": "strike-through" },
                            {
                                title: 'Highlight',
                                value: 'highlight',
                                blockEditor: {
                                    icon: () => 'H',
                                    render: highlightRender
                                }
                            }
                        ]
                    }
                },
                {
                    name: "bloglink",
                    title: "Blogpost",
                    type: 'reference',
                    to: [{ type: 'post' }],
                },
            ]
        }
    ],
}

