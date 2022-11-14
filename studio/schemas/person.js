import { MdPerson } from 'react-icons/md'

export default {
    title: 'Person',
    name: 'person',
    type: 'document',
    icon: MdPerson,
    fields: [
        {
            title: 'Firstname',
            name: 'firstName',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            title: 'Lastname',
            name: 'lastName',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            title: 'Gender pronoun',
            name: 'pronoun',
            type: 'string',
        },
        {
            title: 'Title',
            name: 'title',
            type: 'string',
        },
        {
            description: 'Workplace if not a client. If a client, choose from client list below',
            title: 'Workplace',
            name: 'workplace',
            type: 'string',
        },
        {
            description: "Choose from clients list if person is from one of the clients. If not, add a . workplace in the field above.",
            name: "client",
            title: "Client",
            type: "array",
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'person' }],
                    options: {
                        filter: ({ parent }) => {
                            const existingClient = parent.map(item => {
                                return item._ref;
                            })
                            return {
                                filter: "_id in $ref == false",
                                params: {
                                    ref: existingClient
                                }
                            }
                        }
                    }
                },
            ],
        },
        {
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
            title: 'Facebook',
            name: 'facebook',
            type: 'url',
        },
        {
            title: 'Instagram',
            name: 'instagram',
            type: 'url',
        },
        {
            title: 'LinkedIn',
            name: 'linkedin',
            type: 'url',
        },
        {
            title: 'TikTok',
            name: 'tiktok',
            type: 'url',
        },
        {
            description: "A portrait image of the person in question",
            type: 'blogPostImage',
            name: "image"
        },
        {
            description: "A text that describes the person in question",
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
            title: 'Firstname, ascending',
            name: 'firstNameAsc',
            by: [
                { field: 'firstName', direction: 'asc' }
            ]
        },
        {
            title: 'Firstname, descending',
            name: 'firstNameDesc',
            by: [
                { field: 'firstName', direction: 'desc' }
            ]
        },
        {
            title: 'Lastname, descending',
            name: 'lastNameDesc',
            by: [
                { field: 'lastname', direction: 'desc' }
            ]
        },
        {
            title: 'Lastname, ascending',
            name: 'lastNameAsc',
            by: [
                { field: 'lastname', direction: 'asc' }
            ]
        },
    ],
    preview: {
        select: {
            firstName: 'firstName',
            lastName: 'lastName',
            pronoun: 'pronoun',
            image: 'image'
        },
        prepare(selection) {
            const { firstName, lastName, pronoun, image } = selection
            return {
                title: `${firstName} ${lastName}`,
                subtitle: pronoun,
                media: image
            }
        }
    }
}

