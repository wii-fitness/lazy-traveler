const Sequelize = require('sequelize')
const db = require('../db')

const ItineraryPlace = db.define('itinerary_place', {
  timestamp: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = ItineraryPlace
