import { sanityClient } from '../sanity'
import Menu from '../components/Menu'
import groq from "groq"
import { PortableText } from '@portabletext/react'


const Page = ({ data }) => {
    return (
        <div>
            <Menu test={data.menu} />
            <h2 style={{
                textAlign: "center",
                opacity: ".8"
            }}>
                {data.allPages.title}
            </h2>
            <p style={{ textAlign: "center" }}>{data.allPages.introduction || "This is the leading paragraph"}</p>
            <div
                style={{
                    textAlign: "justify",
                    maxWidth: "450px",
                    margin: "0 auto",
                }}
            >
                <PortableText
                    value={data.allPages.content}
                //components={ptComponents}
                />
            </div>
        </div>
    )
};
export default Page;

export async function getStaticPaths() {
    const query = groq`*[_type == "page" && defined(slug.current)][].slug.current`
    const response = await sanityClient.fetch(query)
    const paths = response.map((slug) => ({
        params: { slug }
    }))
    return {
        paths: paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const allPages = await sanityClient.fetch(groq`
        *[_type == "page" && slug.current == $slug] [0] {
          ...
        }`,
        {
            slug: params.slug
        }
    )
    const menu = await sanityClient.fetch(groq`
        *[_type == "menu"] {
          menupages[]->{
            ...
          }
        }`,
    )
    return {
        props: {
            data: {
                allPages,
                menu
            },
        },
    }
}