**MENU:** [Home](/wyatt/index) - [**TODO**](/wyatt/todo) - [Worklog](/wyatt/log)

# TODOs for Wyatt webpage
Project management for the Wyatt webpage containing a blog for her personal brand and podcast episodes.

The project is separated into the following main categories:

1. Preparations
2. Data model / structured content
3. Content
4. Design
5. Tech

## 1. Preparations
- [x] Create Git repo
- [x] Create readme, todo and log files
 
## 2. Data model / structured content
- [x] Agree on a data model
- [ ] Create the data model in Sanity
    - [x] Blogpost
        - [x] Title
        - [x] Slug (to separate title from url-address if needed)
        - [x] Short intro
        - [x] Hero-image
        - [x] Rich text
        - [x] Publishdate
    - [x] Podcast
        - [x] Title
        - [x] Slug
        - [x] Hero-image
        - [x] Rich text
        - [x] Publish date
        - [x] Guests? (refer to person list)
    - [ ] Persons
        - [x] Name
        - [x] Title
        - [x] Email
        - [x] Webpage 
        - [x] Rich text
        - [ ] ~~Work (refer to work and event lists)?~~
        - [ ] ~~Quotes (refer to quotes)?~~
        - [x] Image
        - [x] Pronoun
        - [x] Title
        - [x] Workplace
        - [x] Social media
    - [x] Work
        - [x] Title
        - [x] Short intro
        - [x] Publish date
        - [x] Client (refer to client list?)
        - [ ] ~~Person responsible (refer to person list?)~~
        - [x] Rich text
        - [x] Hero-Image
        - [x] Images for carousel or gallery (folder on cloudinary?)
    - [x] Events
        - [x] Title
        - [x] Date
        - [x] Place
        - [x] Client (refer to client list)
        - [x] Short intro
        - [x] Rich text
        - [x] Hero-image
        - [x] Images for carousel or gallery
    - [x] Quotes
        - [x] From person in person list (who is also connected to a client)
        - [x] Work in question (refer to work and event list) Do we need this? **Can fetch from person connected to client, and client connected to work?**
        - [x] Quote
    - [x] Clients
        - [x] Company
        - [x] Person (refer to person list)
        - [x] ~~Quote~~
        - [x] Company URL
        - [x] Contact persons email
        - [ ] ~~Work (refer to work and event list)~~
        - [x] Logo, or is that to difficult to maintain / add?
    - [x] Pages
        - [x] Page types
            - [x] Home
            - [x] Blog
            - [x] About
            - [x] Work
            - [x] Events
            - [x] Contact
        - [x] Create pages from pages category in gatsby-node.js
        - [x] Create a temporary page template
    - [x] Menu
        - [x] Create menu schema
        - [x] Create dynamic meny based on menu schema in sanity
    - [ ] Rich text modules
        - [ ] Work
        - [ ] Client
        - [ ] Podcast
        - [ ] Event
        - [ ] Person
        - [ ] Other blog?
        - [ ] Gallery from work?
        - [ ] Gallery from event?
        - [ ] YouTube-embed

## 3. Content
- [ ] Teach the client how to use Sanity

## 4. Design
- [ ] Create design
- [ ] Implement design

## 5. Tech

### Sanity CMS
- [x] Install Sanity
  - [x] Schemas
    - [x] Work
    - [x] Events
    - [x] Podcast
    - [x] Pages
    - [x] Blog
    - [x] Clients
    - [x] Menu
    - [x] Client
    - [x] Quote
    - [x] Person
  - [x] Icons in Studio

### Static Site Generator
- [x] Install Gatsby or ~~Next~~
    - [x] Gatsby
    - [ ] Set up Gatsby cloud for real time editing?
    - [x] Connect Sanity to Gatsby
        - [x] Install gatsby-source-sanity
    - [ ] Set up .env-file
    - [x] Dynamic page generation
    - [x] Dynamic breadcrumbs


### DAM
- [ ] Connect Sanity to Cloudinary?
  - [x] Gallery
  - [ ] Sanity image module
- [ ] Connect Unsplash

### Deployment
- [ ] Connect to Netlify
