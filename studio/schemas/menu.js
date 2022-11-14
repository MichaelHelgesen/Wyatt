import { MdMenu } from 'react-icons/md'

export default {
    title: 'Menu',
    name: 'menu',
    type: 'document',
    icon: MdMenu,
    fields: [
        {
            description: "Choose pages to include in menu, and arrange them in prefered order",
            name: "menupages",
            title: "Pages in menu",
            type: "array",
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'page' }],
                    options: {
                        filter: ({ parent }) => {
                            const existingPage = parent.map(item => {
                                return item._ref;
                            })
                            return {
                                filter: "_id in $ref == false",
                                params: {
                                    ref: existingPage
                                }
                            }
                        }
                    }
                },
            ],
        },
    ],
}

