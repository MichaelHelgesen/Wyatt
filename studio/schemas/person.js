
export default {
    title: 'Person',
    name: 'person',
    type: 'document',
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

