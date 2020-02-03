const db = require('../db')
const Sequelize = require('sequelize')

const Itinerary = db.define('itinerary', {
  city: {
    // COMES AS AN ARRAY from address components, NEED TO CONVERT IN BACK END
    type: Sequelize.STRING
  },
  arrival: {
    type: Sequelize.DATE
  },
  departure: {
    type: Sequelize.DATE
  },
  timeOfStay: {
    type: Sequelize.INTEGER
  }
})

module.exports = Itinerary
