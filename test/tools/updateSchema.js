const blueBird = require('bluebird')
const cfGraphql = require('cf-graphql')
const fs = require('fs')
const writeFile = blueBird.promisify(fs.writeFile)

const config = require('../../config/test')

const client = cfGraphql.createClient({
  spaceId: config.CONTENTFUL_SPACE_ID,
  cdaToken: config.CONTENTFUL_CDA_TOKEN,
  cmaToken: config.CONTENTFUL_MGR_TOKEN
})

client.getContentTypes()
  .then((contentTypes) => {
    return writeFile('test/fixtures/contentTypes.json', JSON.stringify(contentTypes))
  })
  .then((args) => {
    console.log('Successfully Updated Schema!')
  })
  .catch((err) => {
    console.error('Updating schema failed!')
    console.error(err.message)
  })
