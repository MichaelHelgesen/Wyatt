**MENU:** [Home](/wyatt/index) - [TODO](/wyatt/todo) - [**Worklog**](/wyatt/log)

# Worklog
A bullet list of different tasks done from day to day.
**Bolded** text is a reminder to my self that the topic would make a good blogpost on my webpage.

## 31.01.23
- Gave up on filtering as described below. Solved it by changing the Sanity schema.
- Added the ability to change slug in lists based on it´s location. If it´s on the index page, "/blog/" or similar is added. 

## 30.01.23
Finner ikke ut av hvordan jeg kan filtrere referanser i graphQL. Det er ikke mulig å filtrere på "... on Sanity...".
```graphql
query MyQuery {
  allSanityQuote {
    edges {
      node {
        work {
          ... on SanityEvent {
            id
            _id
          }
          ... on SanityWork {
            id
            _id
          }
        }
      }
    }
  }
}
```

Slet med å vise **referanser i forhåndsvisningen** i Sanity (preview). Fant ut at jeg måtte bruke dot-notasjon.
```javascript
preview: {
    select: {
      quote: "quote",
      firstName: "person.firstName",
      lastName: "person.lastName",
    },
    prepare(selection) {
      const { quote, firstName, lastName } = selection;
      return {
        title: `${quote}`,
        subtitle: `${firstName} ${lastName}`,
      };
    },
  },
```
## 27.01.23
- Fikk etablert alle relevante referanser fra ulike sider.
- Endelig fikk jeg til å filtrere referanser basert på id til siden. Jeg hadde blandet *id* og *_id* som er en vesentlig forskjell. *id* er IDen til noden opprettet i gatsbyNode, mens *_id* er IDen til selve objektet i Sanity. Det er denne som må matches med andre objekters *_id*. 
```javascript
  clients: allSanityClient {
    edges {
      node {
       id
       _id
      }
    }
  }

  let id = node.id
  let id2 = node._id
```
## 14.12.22
- Working on including quotes, persons, work and events related to the respective client. Need to filter graphQL, or use static query?
- Added clients as page and a list of client pages.


## 30.11.22
- Added image gallery to work pages.
- Added boolean for choosing payed or personal project.
- Updated work pages to the new client and person schema.

## 28.11.22
- **Is there a way to reset child components based on changes in parent?**
- Added demotext schemas for blog and work to display their unique content.
- Added the ability to link to client on work, and **based on client display connected persons**.
    ```javascript
    {
      description: "client and contact person",
      name: "clientAndContact",
      type: "object",
      fields: [
        {
          type: "reference",
          name: "clientList",
          to: [{ type: "client" }],
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
          name:"personList",
          to: [{ type: "person"}],
          hidden: ({document}) => !document?.clientAndContact,
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
        }
      ],
    },
    ```

## 24.11.22
- Added Gatsby Sanity Image plugin for responsive images and lazy loading.
- Added image component to Portable text from Cloudinary, Unsplash and uploaded.
- Added YouTube-component for Portable text.
- Added icons for internal and external links.
- Added components for internal and external links in Portable text.

## 23.11.22
- Figured out why I did not get any results in custom types: it was not an object, only referances. The following code could not be targeted in portable type as "type":

    ```javascript
    export default {
        name: "testModule",
        title: "Podcast",
        type: "reference",
        to: [{ type: "podcast" }],
    };
    ```
    Sanity say that "type" is Portable Text is:
    > An object of React components that renders different types of objects that might appear both as part of the input array, or as inline objects within text blocks - eg alongside text spans.

    So it has to be an object like this:

    ```javascript
    export default {
        name: "podcastInternalLink",
        type: "object",
        title: "Link to podcast",
        fields: [
            {
                name: "podcastModule",
                title: "Podcast file",
                type: "reference",
                to: [{ type: "podcast" }],
            },
        ],
    };
    ```

- Added **delete and change scripts** for manipulating the dataset.
- Added the ability to add pages and lists in Portable text.

## 22.11.22
- Adding different **custom components to the rich text type**.
- Finally figured out the Portable text plugin.
## 21.11.22
- Used a lot of time to try and understand the new **Portable Text React-plugin**, and write **custom components for it**. 
## 18.11.22
- Added a more dynamic breadcrumb and slug using **Gatsbys pageContext**
- **Added breadcrumbs**.
- Added list for blogs, events, podcasts and work on respective pages.
- Created blog list template.
- Edited gatsby-node to create pages for "pages", blogposts, events, podcasts and work.
## 17.11.22
- Added podcast component to portable text.
- Added the ability to highlight text in Portable Text.
- Webpage now fetches data from Sanity and displays it:
    ![This is an image](https://res.cloudinary.com/mikkesblogg/image/upload/v1668696243/Wyatt/Skjermbilde_2022-11-17_kl._15.43.29_meggal.png)
- Installed schema for template text.
- Installed Portable Text to React.
- Went back to Gatsby (Next is not the best choice for simple blog).
## 16.11.22
- **Using GROQ as query language**, instead of graphQL.
- Created a **menu component in Next**.
- **Created dynamic nested pages**.
## 15.11.22
- Created dynamic pages from blogposts in Next.
- **Installed Next**.
- Added **Cloudinary Plugin** that can select multiple images in array for gallery.
- Added the ability to choose assets from Cloudinary.

## 14.11.22
- Created two Figma files: wireframe and design. This is the wireframe:
    ![This is an image](https://res.cloudinary.com/mikkesblogg/image/upload/v1668458738/Wyatt/Skjermbilde_2022-11-14_kl._21.36.08_mdxt3z.png)
- Added quotes.
- Sanity Studio with icons and structure:
    ![This is an image](https://res.cloudinary.com/mikkesblogg/image/upload/v1668435377/Wyatt/Skjermbilde_2022-11-14_kl._15.15.35_h2rtra.png)
- **Added icons** to the content categories in Sanity Studio.
- Structured the content categories in Sanity Studio
- Added a dynamic meny in Gatsby.
- Studied how to **deploy to Netlify from Studio**.
- Watched a couple of videos and read some blogs about Sanity, and got a lot of ideas how to **structure the studio**. Adding modules to control the look of the page seems very cool - will need a design system though. **How can I import modules dynamically in Gatsby?**
## 13.11.22
- Added a menu schema for manualy handling of menu.
- Pages are working on the webpage.
    ![This is an image](https://res.cloudinary.com/mikkesblogg/image/upload/v1668372706/Wyatt/Skjermbilde_2022-11-13_kl._21.51.34_eg0xhv.png)
- Created page generating from page category in gatsby-node.js.
- Added page schema.
- Sanity and Gatsby is connected!
    ![This is an image](https://res.cloudinary.com/mikkesblogg/image/upload/v1668362203/Wyatt/Skjermbilde_2022-11-13_kl._18.56.12_y2wfcw.png)
- Reinstalled Gatsby and installed a starter blog theme for a more easy conversion.
- Added social media links to person schema.
- This is what the raw data from Sanity looks like in the API, that gets imported to the webpage.
    ![This is an image](https://res.cloudinary.com/mikkesblogg/image/upload/v1668336317/Wyatt/Skjermbilde_2022-11-13_kl._11.34.55_nks2vs.png)
- Error below is because gatsby-source-sanity is not compatible with Gatsby 5.
- Added gatsby-source-sanity package, but it failed. Had to add "--legacy-peer-deps" to make it work.
- Deployed the GraphQL API that will connect to the webpage.
- Deployed the Sanity Studio.

## 12.11.22
- Fields in schemas created:
    ![This is an image](https://res.cloudinary.com/mikkesblogg/image/upload/v1668278216/Wyatt/2022-11-12_kl._19.34.36_xuomz4.png)
- Schemas created:
     ![This is an image](https://res.cloudinary.com/mikkesblogg/image/upload/v1668278215/Wyatt/2022-11-12_kl._19.32.58_plbajp.png)
- Created Blogpost schema in Sanity.
- Created Podcast schema in Sanity.
- Created Person schema in Sanity.
- Created Event schema in Sanity.
- Created Client schema in Sanity.
- Created Work schema in Sanity.
- Got no Babel-errors on my laptop, so it´s probably something I need to install or update on the iMac.
- Got an error in Sanity tsconfig.json file. It found no .ts-files, so I added an empty one on root, and the error went away.
- Sendt the first draft for a data model to the Client.
- Created Github pages for the project [wyatt](https://michaelhelgesen.github.io/wyatt/) to be able to share progress and information with the client.

## 11.11.22
- Created a Project on GitHub to try out. Don´t understand much.
- Added readme, log, and todo files.
- Tried to install Next, but got an error.
- Installed Sanity and Gatsby, but got a Babel-error.

## 10.11.22
- Created Git repo and installed Sanity


