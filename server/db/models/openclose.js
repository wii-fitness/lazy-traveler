const db = require('../db')
const Sequelize = require('sequelize')

const OpenClose = db.define('openclose', {
  day: {
    // COMES AS AN ARRAY from address components, NEED TO CONVERT IN BACK END
    type: Sequelize.INTEGER
  },
  open: {
    type: Sequelize.TIME
  },
  close: {
    type: Sequelize.TIME
  }
})

module.exports = OpenClose
