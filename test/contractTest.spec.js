const cfGraphql = require('cf-graphql')
const fs = require('fs')
const blueBird = require('bluebird')
const readFile = blueBird.promisify(fs.readFile)
const readdir = blueBird.promisify(fs.readdir)
const {parse} = require('graphql/language')
const {validate} = require('graphql/validation')

test('All contracts should be intact', function (done) {
  return readFile('./test/fixtures/contentTypes.json', 'utf8')
  .then((contentTypes) => {
    return JSON.parse(contentTypes)
  })
  .then(cfGraphql.prepareSpaceGraph)
  .then(cfGraphql.createSchema)
  .then((schema) => {
    return readdir('./test/queries/')
    .then((filenames) => {
      return ({
        filenames: filenames,
        schema: schema
      })
    })
    .catch((err) => {
      throw err
    })
  })
  .then((object) => {
    let schemaTests = []
    object.filenames.forEach((filename) => {
      schemaTests.push(new Promise(resolve => {
        readFile(`./test/queries/${filename}`, 'utf8')
        .then((query) => {
          const queryAST = parse(query)
          const errors = validate(object.schema, queryAST)
          const isValid = !errors.length
          if (errors.length) {
            console.log(`There is an issue with ${filename}. With actual error message as follows:\n${errors}`)
          }
          expect(isValid).toBeTruthy()
          resolve()
        })
        .catch((err) => {
          throw err
        })
      }))
    })
    return Promise.all(schemaTests)
  })
  .then(() => done())
  .catch((err) => {
    throw err
  })
})
