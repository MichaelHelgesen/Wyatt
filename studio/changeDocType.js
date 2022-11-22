const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: '9hij0w7q',
  dataset: 'production',
  apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
  token: 'skqh7l5wAFOBALeIEQiuEjOcRbFykP0SJA4Ctity2KFvpEpYqUxoBZjsRxhqAtzoi4RlKTE4E6CLfHQwZN1nldqD1yrIs9YEsN3G49wNqDZWiieTQJRRv4uU0haSNq5vjYrByTqG9VFSj5THhPp56dHA9psSGkO8Adu22WqHnNmZOSynI1uR', // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
})

const query = '*[_type == "events"]'

client.fetch(query).then((docs) => {
    //console.log(docs.date)
    docs.forEach((doc) => {
        let newDoc = {}
        newDoc.date = doc.date
        newDoc.description = doc.description
        newDoc.slug = doc.slug
        newDoc.title = doc.title
        newDoc._type = "event"
        console.log(newDoc)
        client.create(newDoc).then((res) => {
            console.log(`Blog was created, document ID is ${res._id}`)
          })
    })
  })