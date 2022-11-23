const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: '9hij0w7q',
  dataset: 'production',
  apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
  token: 'skqh7l5wAFOBALeIEQiuEjOcRbFykP0SJA4Ctity2KFvpEpYqUxoBZjsRxhqAtzoi4RlKTE4E6CLfHQwZN1nldqD1yrIs9YEsN3G49wNqDZWiieTQJRRv4uU0haSNq5vjYrByTqG9VFSj5THhPp56dHA9psSGkO8Adu22WqHnNmZOSynI1uR', // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
})


client
client.delete({
    query: `*[_id == "ea4bc55f-566b-40c5-bae2-9b6e8fdccc7a"]`})
  .then(() => {
    console.log('The document matching *[_type == "events"] was deleted')
  })
  .catch((err) => {
    console.error('Delete failed: ', err.message)
  })