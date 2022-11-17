/* exports.onCreateNode = ({ node }) => {
    console.log(`Node created of type "${node.internal.type}"`)
} */

exports.createPages = async function ({ actions, graphql }) {
  const { createPage } = actions;
  const { data } = await graphql(`
  query {
      pages: allSanityPage {
          edges {
            node {
              id
              internal {
                  type
                }
              slug {
                current
              }
              title
            }
          }
        }
  }
`)

  const createPages = (node) => {
    let id = node.id
    const createSlug = (string) => string.toLowerCase().replace(/\s+/g, '-').slice(0, 200);
    let titleAsSlug
    let slug
    let pathUrl
    let pageComponent

    if (node.internal.type === "SanityPage") {
      titleAsSlug = createSlug(node.title);
      pathUrl = "/";
      pageComponent = require.resolve(`./src/templates/page.js`);
    } else {
      titleAsSlug = createSlug(node.title);
      pathUrl = "/blogg/";
      pageComponent = (node.internal.type === "SanityPost" ? require.resolve(`./src/templates/blogPost.js`) : require.resolve(`./src/templates/book.js`));
    }

    slug = !node.slug ? titleAsSlug : node.slug.current;

    createPage({
      path: `${pathUrl}${slug}`,
      component: pageComponent,
      context: { id },
    })
  }

  // Create single pages
  data.pages.edges.forEach(({ node }) => {
    if (node.title != "Home") {
      createPages(node)
    }
  })
}