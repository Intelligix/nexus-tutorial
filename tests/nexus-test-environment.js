// tests/nexus-test-environment.js
const mysql = require('mysql')
const NodeEnvironment = require('jest-environment-node')
const { customAlphabet } = require('nanoid')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const prismaBinary = 'prisma'
/**
 * Custom test environment for Nexus, Prisma and Postgres
 */
class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)
    // Generate a unique schema identifier for this test context
    const nanoid = customAlphabet('1234567890abcdef', 6)
    this.schema = `test_${nanoid()}`
    // Generate the pg connection string for the test schema
    this.databaseUrl = `mysql://lgpdok-serverJS:s3rv3rJS@localhost:3306/${this.schema}`
  }
  async setup() {
    // Set the required environment variable to contain the connection string
    // to our database test schema
    process.env.DATABASE_URL = this.databaseUrl
    this.global.process.env.DATABASE_URL = this.databaseUrl

//    npx prisma migrate save --name init --experimental
//    npx prisma migrate up --experimental

    // Run the migrations to ensure our schema has the required structure
    console.log(`npx ${prismaBinary} migrate up --create-db --experimental`)
    await exec(`npx ${prismaBinary} migrate up --create-db --experimental`)
    console.log('database created: ' + process.env.DATABASE_URL)
    return super.setup()
  }
  async teardown() {
    // Drop the schema after the tests have completed
    const client = mysql.createConnection(this.databaseUrl)
    client.connect()
    client.query(`DROP SCHEMA IF EXISTS ${this.schema}`)
    client.end()
  }
}
module.exports = PrismaTestEnvironment