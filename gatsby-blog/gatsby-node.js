/* exports.onCreateNode = ({ node }) => {
    console.log(`Node created of type "${node.internal.type}"`)
} */

exports.createPages = async function ({ actions, graphql }) {
  const { createPage } = actions
  const { data } = await graphql(`
    query {
      pages: allSanityPage {
        edges {
          node {
            _id
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
      blogs: allSanityBlog {
        edges {
          node {
            _id
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
      podcasts: allSanityPodcast {
        edges {
          node {
            _id
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
      works: allSanityWork {
        edges {
          node {
            _id
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
      clients: allSanityClient {
        edges {
          node {
            _id
            internal {
              type
            }
            slug {
              current
            }
            name
          }
        }
      }
      events: allSanityEvent {
        edges {
          node {
            _id
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

  const createSlug = string =>
    string.toLowerCase().replace(/\s+/g, "-").slice(0, 200)

  const createPages = node => {
    let id = node._id
    let titleAsSlug
    let slug
    let pathUrl
    let category
    let pageComponent
    let type = node.internal.type

    if (type === "SanityPage") {
      titleAsSlug = createSlug(node.title)
      pathUrl = "/"
      pageComponent = require.resolve(`./src/templates/page.js`)
    } else if (type == "SanityBlog") {
      titleAsSlug = createSlug(node.title)
      pathUrl = "/blog/"
      pageComponent = require.resolve(`./src/templates/blog.js`)
    } else if (type == "SanityPodcast") {
      titleAsSlug = createSlug(node.title)
      pathUrl = "/podcasts/"
      pageComponent = require.resolve(`./src/templates/podcast.js`)
    } else if (type == "SanityWork") {
      titleAsSlug = createSlug(node.title)
      pathUrl = "/work/"
      pageComponent = require.resolve(`./src/templates/work.js`)
    } else if (type == "SanityEvent") {
      titleAsSlug = createSlug(node.title)
      pathUrl = "/event/"
      pageComponent = require.resolve(`./src/templates/event.js`)
    } else if (type == "SanityClient") {
      titleAsSlug = createSlug(node.name)
      pathUrl = "/clients/"
      pageComponent = require.resolve(`./src/templates/client.js`)
    }
    slug = !node.slug ? titleAsSlug : node.slug.current

    createPage({
      path: `${pathUrl}${slug}`,
      component: pageComponent,
      context: { id, type, pathUrl, slug},
    })
  }

  // Create single pages
  data.pages.edges.forEach(({ node }) => {
    if (node.title != "Home") {
      console.log("Creating page: ", node.title)
      createPages(node)
    }
  })
  // Create blogposts
  data.blogs.edges.forEach(({ node }) => {
    console.log("Creating blogpost: ", node.title)
    createPages(node)
  })
  // Create podcast posts
  data.podcasts.edges.forEach(({ node }) => {
    console.log("Creating podcast post: ", node.title)
    createPages(node)
  })
  // Create work posts
  data.works.edges.forEach(({ node }) => {
    console.log("Creating work post: ", node.title)
    createPages(node)
  })
  // Create event posts
  data.events.edges.forEach(({ node }) => {
    console.log("Creating event post: ", node.title)
    createPages(node)
  })
  // Create client posts
  data.clients.edges.forEach(({ node }) => {
    console.log("Creating client post: ", node.name)
    createPages(node)
  })
}
