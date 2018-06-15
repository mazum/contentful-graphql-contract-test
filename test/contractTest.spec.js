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
    let schemaTest = []
    object.filenames.forEach((filename) => {
      schemaTest.push(new Promise(resolve => {
        readFile(`./test/queries/${filename}`, 'utf8')
        .then((query) => {
          const queryAST = parse(query)
          const errors = validate(object.schema, queryAST)
          const isValid = !errors.length
          expect(isValid).toBe(true)
          resolve()
        })
        .catch((err) => {
          throw err
        })
      }))
    })
    return Promise.all(schemaTest)
  })
  .then(() => done())
  .catch((err) => {
    throw err
  })
})