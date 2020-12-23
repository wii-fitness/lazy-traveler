const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  //process.env.DATABASE_URL ||
  //`postgres://hrzzcyopnspdxs:ea97b365a27eea850063ee5ef76e4f6c15de1f367ac4c5e25853cd0297c2bbdb@ec2-54-172-219-218.compute-1.amazonaws.com:5432/d2rdujiodfnmqb`,
  process.env.DATABASE_URL ||
    `postgres://postgres:postgres@localhost:5432/${databaseName}`,
  {
    logging: false
  }
)
module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
